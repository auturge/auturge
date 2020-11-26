/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { isUndefined } from "./isUndefined";

/**
 * @returns whether the provided parameter is undefined or null.
 */
export function isUndefinedOrNull(obj: any): obj is undefined | null {
    return isUndefined(obj) || obj === null;
}
