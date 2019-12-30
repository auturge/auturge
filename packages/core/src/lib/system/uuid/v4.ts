/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { UUID } from "./UUID";
import { V4UUID } from "./V4UUID";

export function v4(): UUID {
    return new V4UUID();
}
