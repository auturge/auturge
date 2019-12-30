/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { onUnexpectedError } from "../error-handling/public_api";
import { LinkedList } from "../collections/public_api";
import { CancellationToken } from "../cancellation/public_api";
import { Emitter } from "./Emitter";
import { Listener } from "./Listener";

export interface IWaitUntil {
    waitUntil(thenable: Promise<any>): void;
}

export class AsyncEmitter<T extends IWaitUntil> extends Emitter<T> {
    private _asyncDeliveryQueue?: LinkedList<[Listener<T>, Omit<T, "waitUntil">]>;

    async fireAsync(
        data: Omit<T, "waitUntil">,
        token: CancellationToken,
        promiseJoin?: (p: Promise<any>, listener: Function) => Promise<any>
    ): Promise<void> {
        if (!this._listeners) {
            return;
        }

        if (!this._asyncDeliveryQueue) {
            this._asyncDeliveryQueue = new LinkedList();
        }

        for (let iter = this._listeners.iterator(), e = iter.next(); !e.done; e = iter.next()) {
            this._asyncDeliveryQueue.push([e.value, data]);
        }

        while (this._asyncDeliveryQueue.size > 0 && !token.isCancellationRequested) {
            const [listener, data] = this._asyncDeliveryQueue.shift()!;
            const thenables: Promise<any>[] = [];

            const event = <T>{
                ...data,
                waitUntil: (p: Promise<any>): void => {
                    if (Object.isFrozen(thenables)) {
                        throw new Error("waitUntil can NOT be called asynchronous");
                    }
                    if (promiseJoin) {
                        p = promiseJoin(p, typeof listener === "function" ? listener : listener[0]);
                    }
                    thenables.push(p);
                }
            };

            try {
                if (typeof listener === "function") {
                    listener.call(undefined, event);
                } else {
                    listener[0].call(listener[1], event);
                }
            } catch (e) {
                onUnexpectedError(e);
                continue;
            }

            // freeze thenables-collection to enforce sync-calls to
            // wait until and then wait for all thenables to resolve
            Object.freeze(thenables);
            await Promise.all(thenables).catch((e) => onUnexpectedError(e));
        }
    }
}
