/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "./IDisposable";

export function isDisposable<E extends object>(thing: E): thing is E & IDisposable {
    return (
        typeof (<IDisposable>(<any>thing)).dispose === "function" &&
        (<IDisposable>(<any>thing)).dispose.length === 0
    );
}
