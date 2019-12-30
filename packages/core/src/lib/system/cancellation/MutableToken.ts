/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Event } from "../events/Event";
import { Emitter } from "../events/Emitter";
import { CancellationToken, shortcutEvent } from "./CancellationToken";

export class MutableToken implements CancellationToken {
    private _isCancelled: boolean = false;
    private _emitter: Emitter<any> | null = null;

    public cancel() {
        if (!this._isCancelled) {
            this._isCancelled = true;
            if (this._emitter) {
                this._emitter.fire(undefined);
                this.dispose();
            }
        }
    }

    get isCancellationRequested(): boolean {
        return this._isCancelled;
    }

    get onCancellationRequested(): Event<any> {
        if (this._isCancelled) {
            return shortcutEvent;
        }
        if (!this._emitter) {
            this._emitter = new Emitter<any>();
        }
        return this._emitter.event;
    }

    public dispose(): void {
        if (this._emitter) {
            this._emitter.dispose();
            this._emitter = null;
        }
    }
}
