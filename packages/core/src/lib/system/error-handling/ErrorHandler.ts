/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IErrorListenerCallback } from "./IErrorListenerCallback";
import { IErrorListenerUnbind } from "./IErrorListenerUnbind";

// Avoid circular dependency on EventEmitter by implementing a subset of the interface.
export class ErrorHandler {
    private unexpectedErrorHandler: (e: any) => void;
    private listeners: IErrorListenerCallback[];

    constructor() {
        this.listeners = [];

        this.unexpectedErrorHandler = function(e: any) {
            setTimeout(() => {
                if (e.stack) {
                    throw new Error(e.message + "\n\n" + e.stack);
                }

                throw e;
            }, 0);
        };
    }

    public addListener(listener: IErrorListenerCallback): IErrorListenerUnbind {
        this.listeners.push(listener);

        return () => {
            this._removeListener(listener);
        };
    }

    private emit(e: any): void {
        this.listeners.forEach((listener) => {
            listener(e);
        });
    }

    private _removeListener(listener: IErrorListenerCallback): void {
        this.listeners.splice(this.listeners.indexOf(listener), 1);
    }

    public setUnexpectedErrorHandler(newUnexpectedErrorHandler: (e: any) => void): void {
        this.unexpectedErrorHandler = newUnexpectedErrorHandler;
    }

    public getUnexpectedErrorHandler(): (e: any) => void {
        return this.unexpectedErrorHandler;
    }

    public onUnexpectedError(e: any): void {
        this.unexpectedErrorHandler(e);
        this.emit(e);
    }

    // For external errors, we don't want the listeners to be called
    public onUnexpectedExternalError(e: any): void {
        this.unexpectedErrorHandler(e);
    }
}

export const errorHandler = new ErrorHandler();
