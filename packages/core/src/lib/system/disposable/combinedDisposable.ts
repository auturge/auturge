/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "./IDisposable";
import { dispose } from "./dispose";
import { markTracked, trackDisposable } from "./_trackDisposables";

export function combinedDisposable(...disposables: IDisposable[]): IDisposable {
    disposables.forEach(markTracked);
    return trackDisposable({ dispose: () => dispose(disposables) });
}
