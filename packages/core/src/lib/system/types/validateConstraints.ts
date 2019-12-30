/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { TypeConstraint } from "./TypeConstraint";
import { validateConstraint } from "./validateConstraint";

export function validateConstraints(
    args: any[],
    constraints: Array<TypeConstraint | undefined>
): void {
    const len = Math.min(args.length, constraints.length);
    for (let i = 0; i < len; i++) {
        validateConstraint(args[i], constraints[i]);
    }
}
