/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from "../disposable/public_api";
import { Event, Emitter } from "../events/public_api";
import { ITelemetryData } from "./ITelemetryData";
import { IAction } from "./IAction";
import { IActionChangeEvent } from "./IActionChangeEvent";

export class Action extends Disposable implements IAction {
    protected _onDidChange = this._register(new Emitter<IActionChangeEvent>());

    readonly onDidChange: Event<IActionChangeEvent> = this._onDidChange.event;

    protected readonly _id: string;
    protected _label: string;
    protected _tooltip: string | undefined;
    protected _cssClass: string | undefined;
    protected _enabled: boolean = true;
    protected _checked: boolean = false;
    protected readonly _actionCallback?: (event?: any) => Promise<any>;

    constructor(
        id: string,
        label: string = "",
        cssClass: string = "",
        enabled: boolean = true,
        actionCallback?: (event?: any) => Promise<any>
    ) {
        super();
        this._id = id;
        this._label = label;
        this._cssClass = cssClass;
        this._enabled = enabled;
        this._actionCallback = actionCallback;
    }

    get id(): string {
        return this._id;
    }

    get label(): string {
        return this._label;
    }

    set label(value: string) {
        this._setLabel(value);
    }

    private _setLabel(value: string): void {
        if (this._label !== value) {
            this._label = value;
            this._onDidChange.fire({ label: value });
        }
    }

    get tooltip(): string {
        return this._tooltip || "";
    }

    set tooltip(value: string) {
        this._setTooltip(value);
    }

    protected _setTooltip(value: string): void {
        if (this._tooltip !== value) {
            this._tooltip = value;
            this._onDidChange.fire({ tooltip: value });
        }
    }

    get class(): string | undefined {
        return this._cssClass;
    }

    set class(value: string | undefined) {
        this._setClass(value);
    }

    protected _setClass(value: string | undefined): void {
        if (this._cssClass !== value) {
            this._cssClass = value;
            this._onDidChange.fire({ class: value });
        }
    }

    get enabled(): boolean {
        return this._enabled;
    }

    set enabled(value: boolean) {
        this._setEnabled(value);
    }

    protected _setEnabled(value: boolean): void {
        if (this._enabled !== value) {
            this._enabled = value;
            this._onDidChange.fire({ enabled: value });
        }
    }

    get checked(): boolean {
        return this._checked;
    }

    set checked(value: boolean) {
        this._setChecked(value);
    }

    protected _setChecked(value: boolean): void {
        if (this._checked !== value) {
            this._checked = value;
            this._onDidChange.fire({ checked: value });
        }
    }

    run(event?: any, _data?: ITelemetryData): Promise<any> {
        if (this._actionCallback) {
            return this._actionCallback(event);
        }
        return Promise.resolve(true);
    }
}
