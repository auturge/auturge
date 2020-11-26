/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { isUndefinedOrNull } from "./isUndefinedOrNull";

/**
 * Asserts that the argument passed in is neither undefined nor null.
 */
export function assertIsDefined<T>(arg: T | null | undefined): T {
    if (isUndefinedOrNull(arg)) {
        throw new Error("Assertion Failed: argument is undefined or null");
    }
    return arg;
}
