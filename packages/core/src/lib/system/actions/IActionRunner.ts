/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "../disposable/public_api";
import { Event } from "../events/public_api";
import { IAction } from "./IAction";
import { IRunEvent } from "./IRunEvent";

export interface IActionRunner extends IDisposable {
    run(action: IAction, context?: any): Promise<any>;
    readonly onDidRun: Event<IRunEvent>;
    readonly onDidBeforeRun: Event<IRunEvent>;
}
