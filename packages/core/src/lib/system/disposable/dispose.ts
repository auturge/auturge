/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "./IDisposable";
import { markTracked } from "./_trackDisposables";

export function dispose<T extends IDisposable>(disposable: T): T;
export function dispose<T extends IDisposable>(disposable: T | undefined): T | undefined;
export function dispose<T extends IDisposable>(disposables: Array<T>): Array<T>;
export function dispose<T extends IDisposable>(disposables: ReadonlyArray<T>): ReadonlyArray<T>;
export function dispose<T extends IDisposable>(
    disposables: T | T[] | undefined
): T | T[] | undefined {
    if (Array.isArray(disposables)) {
        disposables.forEach((d) => {
            if (d) {
                markTracked(d);
                d.dispose();
            }
        });
        return [];
    } else if (disposables) {
        markTracked(disposables);
        disposables.dispose();
        return disposables;
    } else {
        return undefined;
    }
}
