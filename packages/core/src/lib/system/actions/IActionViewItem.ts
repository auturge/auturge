/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "../disposable/public_api";
import { IActionRunner } from "./IActionRunner";

export interface IActionViewItem extends IDisposable {
    readonly actionRunner: IActionRunner;
    setActionContext(context: any): void;
    render(element: any /* HTMLElement */): void;
    isEnabled(): boolean;
    focus(): void;
    blur(): void;
}
