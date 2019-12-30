/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { _typeof } from "./_typeof";

/**
 * @returns whether the provided parameter is a JavaScript Function or not.
 */
export function isFunction(obj: any): obj is Function {
    return typeof obj === _typeof.function;
}
