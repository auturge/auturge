/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { equals } from "./assign";

type obj = { [key: string]: any };

/**
 * Returns an object that has keys for each value that is different in the base object. Keys
 * that do not exist in the target but in the base object are not considered.
 *
 * Note: This is not a deep-diffing method, so the values are strictly taken into the resulting
 * object if they differ.
 *
 * @param base the object to diff against
 * @param obj the object to use for diffing
 */
export function distinct(base: obj, target: obj): obj {
    const result = Object.create(null);
    if (!base || !target) {
        return result;
    }
    const targetKeys = Object.keys(target);
    targetKeys.forEach((k) => {
        const baseValue = base[k];
        const targetValue = target[k];
        if (!equals(baseValue, targetValue)) {
            result[k] = targetValue;
        }
    });
    return result;
}
