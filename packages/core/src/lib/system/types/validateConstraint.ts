/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { isString } from "./isString";
import { isUndefinedOrNull } from "./isUndefinedOrNull";
import { isFunction } from "./isFunction";
import { TypeConstraint } from "./TypeConstraint";

export function validateConstraint(arg: any, constraint: TypeConstraint | undefined): void {
    if (isString(constraint)) {
        if (typeof arg !== constraint) {
            throw new Error(`argument does not match constraint: typeof ${constraint}`);
        }
    } else if (isFunction(constraint)) {
        try {
            if (arg instanceof constraint) {
                return;
            }
        } catch {
            // ignore
        }
        if (!isUndefinedOrNull(arg) && arg.constructor === constraint) {
            return;
        }
        if (constraint.length === 1 && constraint.call(undefined, arg) === true) {
            return;
        }
        throw new Error(
            `argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true`
        );
    }
}
