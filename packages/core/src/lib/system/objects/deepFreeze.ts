/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { _hasOwnProperty } from "./_hasOwnProperty";

export function deepFreeze<T>(obj: T): T {
    if (!obj || typeof obj !== "object") {
        return obj;
    }
    const stack: any[] = [obj];
    while (stack.length > 0) {
        const obj = stack.shift();
        Object.freeze(obj);
        for (const key in obj) {
            if (_hasOwnProperty.call(obj, key)) {
                const prop = obj[key];
                if (typeof prop === "object" && !Object.isFrozen(prop)) {
                    stack.push(prop);
                }
            }
        }
    }
    return obj;
}
