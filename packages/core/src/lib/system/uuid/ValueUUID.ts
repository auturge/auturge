/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { UUID } from "./UUID";

export class ValueUUID implements UUID {
    constructor(public _value: string) {
        // empty
    }

    public asHex(): string {
        return this._value;
    }
}
