/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IReference } from "./IReference";

export class ImmortalReference<T> implements IReference<T> {
    constructor(public object: T) {}
    dispose(): void {
        /* noop */
    }
}
