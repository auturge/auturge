/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { _typeof } from "./_typeof";

/**
 * @returns whether the provided parameter is undefined.
 */
export function isUndefined(obj: any): obj is undefined {
    return typeof obj === _typeof.undefined;
}
