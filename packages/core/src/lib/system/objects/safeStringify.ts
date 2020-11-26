/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { isObject } from "../types/isObject";

/**
 * Calls JSON.Stringify with a replacer to break apart any circular references.
 * This prevents JSON.stringify from throwing the exception
 *  "Uncaught TypeError: Converting circular structure to JSON"
 */
export function safeStringify(obj: any): string {
    const seen: any[] = [];
    return JSON.stringify(obj, (key, value) => {
        if (isObject(value) || Array.isArray(value)) {
            if (seen.indexOf(value) !== -1) {
                return "[Circular]";
            } else {
                seen.push(value);
            }
        }
        return value;
    });
}
