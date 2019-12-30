/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export function assertType(condition: any, type?: string): asserts condition {
    if (!condition) {
        throw new Error(type ? `Unexpected type, expected '${type}'` : "Unexpected type");
    }
}
