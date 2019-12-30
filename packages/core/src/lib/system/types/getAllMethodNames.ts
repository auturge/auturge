/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { getAllPropertyNames } from "./getAllPropertyNames";

export function getAllMethodNames(obj: object): string[] {
    const methods: string[] = [];
    for (const prop of getAllPropertyNames(obj)) {
        if (typeof (obj as any)[prop] === "function") {
            methods.push(prop);
        }
    }
    return methods;
}
