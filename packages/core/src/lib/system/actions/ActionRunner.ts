/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from "../disposable/public_api";
import { Event, Emitter } from "../events/public_api";
import { IAction } from "./IAction";
import { IActionRunner } from "./IActionRunner";
import { IRunEvent } from "./IRunEvent";

export class ActionRunner extends Disposable implements IActionRunner {
    private _onDidBeforeRun = this._register(new Emitter<IRunEvent>());
    readonly onDidBeforeRun: Event<IRunEvent> = this._onDidBeforeRun.event;
    private _onDidRun = this._register(new Emitter<IRunEvent>());
    readonly onDidRun: Event<IRunEvent> = this._onDidRun.event;

    async run(action: IAction, context?: any): Promise<any> {
        if (!action.enabled) {
            return Promise.resolve(null);
        }
        this._onDidBeforeRun.fire({ action: action });
        try {
            const result = await this.runAction(action, context);
            this._onDidRun.fire({ action: action, result: result });
        } catch (error) {
            this._onDidRun.fire({ action: action, error: error });
        }
    }

    protected runAction(action: IAction, context?: any): Promise<any> {
        const res = context ? action.run(context) : action.run();
        return Promise.resolve(res);
    }
}
