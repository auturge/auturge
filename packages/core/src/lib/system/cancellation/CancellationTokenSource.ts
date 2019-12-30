/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "../disposable/IDisposable";
import { CancellationToken } from "./CancellationToken";
import { MutableToken } from "./MutableToken";

export class CancellationTokenSource {
    private _token?: CancellationToken = undefined;
    private _parentListener?: IDisposable = undefined;

    constructor(parent?: CancellationToken) {
        this._parentListener = parent && parent.onCancellationRequested(this.cancel, this);
    }

    get token(): CancellationToken {
        if (!this._token) {
            // be lazy and create the token only when
            // actually needed
            this._token = new MutableToken();
        }
        return this._token;
    }

    cancel(): void {
        if (!this._token) {
            // save an object by returning the default
            // cancelled token when cancellation happens
            // before someone asks for the token
            this._token = CancellationToken.Cancelled;
        } else if (this._token instanceof MutableToken) {
            // actually cancel
            this._token.cancel();
        }
    }

    dispose(cancel: boolean = false): void {
        if (cancel) {
            this.cancel();
        }
        if (this._parentListener) {
            this._parentListener.dispose();
        }
        if (!this._token) {
            // ensure to initialize with an empty token if we had none
            this._token = CancellationToken.None;
        } else if (this._token instanceof MutableToken) {
            // actually dispose
            this._token.dispose();
        }
    }
}
