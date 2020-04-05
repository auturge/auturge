/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { isArray } from "./isArray";
import { isString } from "./isString";

/**
 * @returns whether the provided parameter is a JavaScript Array and each element in the array is a string.
 */
export function isStringArray(value: any): value is string[] {
    return isArray(value) && (<any[]>value).every((elem) => isString(elem));
}