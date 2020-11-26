/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { UUID } from "./UUID";
import { ValueUUID } from "./ValueUUID";
import { isUUID } from "./isUUID";

/**
 * Parses a UUID that is of the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.
 * @param value A UUID string.
 */
export function parse(value: string): UUID {
    if (!isUUID(value)) {
        throw new Error("invalid uuid");
    }

    return new ValueUUID(value);
}
