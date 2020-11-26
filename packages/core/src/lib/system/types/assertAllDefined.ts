/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { isUndefinedOrNull } from "./isUndefinedOrNull";

/**
 * Asserts that each argument passed in is neither undefined nor null.
 */
export function assertAllDefined<T1, T2>(
    t1: T1 | null | undefined,
    t2: T2 | null | undefined
): [T1, T2];
export function assertAllDefined<T1, T2, T3>(
    t1: T1 | null | undefined,
    t2: T2 | null | undefined,
    t3: T3 | null | undefined
): [T1, T2, T3];
export function assertAllDefined<T1, T2, T3, T4>(
    t1: T1 | null | undefined,
    t2: T2 | null | undefined,
    t3: T3 | null | undefined,
    t4: T4 | null | undefined
): [T1, T2, T3, T4];
export function assertAllDefined(...args: (unknown | null | undefined)[]): unknown[] {
    const result = [];
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (isUndefinedOrNull(arg)) {
            throw new Error(`Assertion Failed: argument at index ${i} is undefined or null`);
        }
        result.push(arg);
    }
    return result;
}
