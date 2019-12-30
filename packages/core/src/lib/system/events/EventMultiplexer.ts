/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable, toDisposable } from "../disposable/public_api";
import { once } from "../functional/public_api";
import { Emitter } from "./Emitter";
import { Event } from "./Event";

export class EventMultiplexer<T> implements IDisposable {
    private readonly emitter: Emitter<T>;
    private hasListeners = false;
    private events: {
        event: Event<T>;
        listener: IDisposable | null;
    }[] = [];
    constructor() {
        this.emitter = new Emitter<T>({
            onFirstListenerAdd: () => this.onFirstListenerAdd(),
            onLastListenerRemove: () => this.onLastListenerRemove()
        });
    }
    get event(): Event<T> {
        return this.emitter.event;
    }
    add(event: Event<T>): IDisposable {
        const e = { event: event, listener: null };
        this.events.push(e);
        if (this.hasListeners) {
            this.hook(e);
        }
        const dispose = () => {
            if (this.hasListeners) {
                this.unhook(e);
            }
            const idx = this.events.indexOf(e);
            this.events.splice(idx, 1);
        };
        return toDisposable(once(dispose));
    }
    private onFirstListenerAdd(): void {
        this.hasListeners = true;
        this.events.forEach((e) => this.hook(e));
    }
    private onLastListenerRemove(): void {
        this.hasListeners = false;
        this.events.forEach((e) => this.unhook(e));
    }
    private hook(e: { event: Event<T>; listener: IDisposable | null }): void {
        e.listener = e.event((r) => this.emitter.fire(r));
    }
    private unhook(e: { event: Event<T>; listener: IDisposable | null }): void {
        if (e.listener) {
            e.listener.dispose();
        }
        e.listener = null;
    }
    dispose(): void {
        this.emitter.dispose();
    }
}
