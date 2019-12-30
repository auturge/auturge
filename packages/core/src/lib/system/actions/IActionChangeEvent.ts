/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export interface IActionChangeEvent {
    readonly label?: string;
    readonly tooltip?: string;
    readonly class?: string;
    readonly enabled?: boolean;
    readonly checked?: boolean;
}
