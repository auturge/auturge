/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export function getOrDefault<T, R>(obj: T, fn: (obj: T) => R | undefined, defaultValue: R): R {
    const result = fn(obj);
    return typeof result === "undefined" ? defaultValue : result;
}
