/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "./IDisposable";
import { markTracked } from "./_trackDisposables";

export class DisposableStore implements IDisposable {
    private _toDispose = new Set<IDisposable>();
    private _isDisposed = false;

    /**
     * Dispose of all registered disposables and mark this object as disposed.
     *
     * Any future disposables added to this object will be disposed of on `add`.
     */
    public dispose(): void {
        if (this._isDisposed) {
            return;
        }

        markTracked(this);
        this._isDisposed = true;
        this.clear();
    }

    /**
     * Dispose of all registered disposables but do not mark this object as disposed.
     */
    public clear(): void {
        this._toDispose.forEach((item) => item.dispose());
        this._toDispose.clear();
    }

    public add<T extends IDisposable>(t: T): T {
        if (!t) {
            return t;
        }
        if (((t as any) as DisposableStore) === this) {
            throw new Error("Cannot register a disposable on itself!");
        }

        markTracked(t);
        if (this._isDisposed) {
            console.warn(
                new Error(
                    "Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!"
                ).stack
            );
        } else {
            this._toDispose.add(t);
        }

        return t;
    }
}
