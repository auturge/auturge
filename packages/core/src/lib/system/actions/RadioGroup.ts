/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from "../disposable/public_api";
import { Action } from "./Action";

export class RadioGroup extends Disposable {
    constructor(readonly actions: Action[]) {
        super();

        for (const action of actions) {
            this._register(
                action.onDidChange((e) => {
                    if (e.checked && action.checked) {
                        for (const candidate of actions) {
                            if (candidate !== action) {
                                candidate.checked = false;
                            }
                        }
                    }
                })
            );
        }
    }
}
