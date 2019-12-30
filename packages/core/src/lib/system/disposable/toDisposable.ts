/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "./IDisposable";
import { trackDisposable, markTracked } from "./_trackDisposables";

export function toDisposable(fn: () => void): IDisposable {
    const self = trackDisposable({
        dispose: () => {
            markTracked(self);
            fn();
        }
    });
    return self;
}
