/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IAction } from "./IAction";

export interface IRunEvent {
    readonly action: IAction;
    readonly result?: any;
    readonly error?: any;
}
