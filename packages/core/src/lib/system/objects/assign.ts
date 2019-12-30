/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export function assign<T>(destination: T): T;
export function assign<T, U>(destination: T, u: U): T & U;
export function assign<T, U, V>(destination: T, u: U, v: V): T & U & V;
export function assign<T, U, V, W>(destination: T, u: U, v: V, w: W): T & U & V & W;
export function assign(destination: any, ...sources: any[]): any {
    sources.forEach((source) =>
        Object.keys(source).forEach((key) => (destination[key] = source[key]))
    );
    return destination;
}
export function equals(one: any, other: any): boolean {
    if (one === other) {
        return true;
    }
    if (one === null || one === undefined || other === null || other === undefined) {
        return false;
    }
    if (typeof one !== typeof other) {
        return false;
    }
    if (typeof one !== "object") {
        return false;
    }
    if (Array.isArray(one) !== Array.isArray(other)) {
        return false;
    }
    let i: number;
    let key: string;
    if (Array.isArray(one)) {
        if (one.length !== other.length) {
            return false;
        }
        for (i = 0; i < one.length; i++) {
            if (!equals(one[i], other[i])) {
                return false;
            }
        }
    } else {
        const oneKeys: string[] = [];
        for (key in one) {
            oneKeys.push(key);
        }
        oneKeys.sort();
        const otherKeys: string[] = [];
        for (key in other) {
            otherKeys.push(key);
        }
        otherKeys.sort();
        if (!equals(oneKeys, otherKeys)) {
            return false;
        }
        for (i = 0; i < oneKeys.length; i++) {
            if (!equals(one[oneKeys[i]], other[oneKeys[i]])) {
                return false;
            }
        }
    }
    return true;
}
