/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export interface IEmitterOptions {
    onFirstListenerAdd?: Function;
    onFirstListenerDidAdd?: Function;
    onListenerDidAdd?: Function;
    onLastListenerRemove?: Function;
    leakWarningThreshold?: number;
}
