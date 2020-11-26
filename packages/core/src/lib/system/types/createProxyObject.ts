/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export function createProxyObject<T extends object>(
    methodNames: string[],
    invoke: (method: string, args: any[]) => any
): T {
    const createProxyMethod = (method: string): (() => any) => {
        return function() {
            const args = Array.prototype.slice.call(arguments, 0);
            return invoke(method, args);
        };
    };
    let result = {} as T;
    for (const methodName of methodNames) {
        (<any>result)[methodName] = createProxyMethod(methodName);
    }
    return result;
}
