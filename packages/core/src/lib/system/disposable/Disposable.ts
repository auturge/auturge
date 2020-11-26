/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "./IDisposable";
import { DisposableStore } from "./DisposableStore";
import { trackDisposable, markTracked } from "./_trackDisposables";

export abstract class Disposable implements IDisposable {
    static None = Object.freeze<IDisposable>({ dispose() {} });

    private readonly _store = new DisposableStore();

    constructor() {
        trackDisposable(this);
    }

    public dispose(): void {
        markTracked(this);

        this._store.dispose();
    }

    protected _register<T extends IDisposable>(t: T): T {
        if (((t as any) as Disposable) === this) {
            throw new Error("Cannot register a disposable on itself!");
        }
        return this._store.add(t);
    }
}
