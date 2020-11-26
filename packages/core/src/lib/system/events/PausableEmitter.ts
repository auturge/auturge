/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { LinkedList } from "../collections/LinkedList";
import { Emitter } from "./Emitter";
import { IEmitterOptions } from "./IEmitterOptions";

export class PauseableEmitter<T> extends Emitter<T> {
    private _isPaused = 0;
    private _eventQueue = new LinkedList<T>();
    private _mergeFn?: (input: T[]) => T;

    constructor(options?: IEmitterOptions & { merge?: (input: T[]) => T }) {
        super(options);
        this._mergeFn = options && options.merge;
    }

    pause(): void {
        this._isPaused++;
    }

    resume(): void {
        if (this._isPaused !== 0 && --this._isPaused === 0) {
            if (this._mergeFn) {
                // use the merge function to create a single composite
                // event. make a copy in case firing pauses this emitter
                const events = this._eventQueue.toArray();
                this._eventQueue.clear();
                super.fire(this._mergeFn(events));
            } else {
                // no merging, fire each event individually and test
                // that this emitter isn't paused halfway through
                while (!this._isPaused && this._eventQueue.size !== 0) {
                    super.fire(this._eventQueue.shift()!);
                }
            }
        }
    }

    fire(event: T): void {
        if (this._listeners) {
            if (this._isPaused !== 0) {
                this._eventQueue.push(event);
            } else {
                super.fire(event);
            }
        }
    }
}
