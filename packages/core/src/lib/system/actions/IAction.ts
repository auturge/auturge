/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "../disposable/public_api";

export interface IAction extends IDisposable {
    readonly id: string;
    label: string;
    tooltip: string;
    class: string | undefined;
    enabled: boolean;
    checked: boolean;
    run(event?: any): Promise<any>;
}
