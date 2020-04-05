/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "./IDisposable";
import { trackDisposable, markTracked } from "./_trackDisposables";

/**
 * Manages the lifecycle of a disposable value that may be changed.
 *
 * This ensures that when the disposable value is changed, the previously held disposable is disposed of. You can
 * also register a `MutableDisposable` on a `Disposable` to ensure it is automatically cleaned up.
 */
export class MutableDisposable<T extends IDisposable> implements IDisposable {
    private _value?: T;
    private _isDisposed = false;

    constructor() {
        trackDisposable(this);
    }

    get value(): T | undefined {
        return this._isDisposed ? undefined : this._value;
    }

    set value(value: T | undefined) {
        if (this._isDisposed || value === this._value) {
            return;
        }
        if (this._value) {
            this._value.dispose();
        }
        if (value) {
            markTracked(value);
        }
        this._value = value;
    }

    clear() {
        this.value = undefined;
    }

    dispose(): void {
        this._isDisposed = true;
        markTracked(this);
        if (this._value) {
            this._value.dispose();
        }
        this._value = undefined;
    }
}