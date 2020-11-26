/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable, Disposable } from "../disposable/public_api";
import { Emitter } from "./Emitter";
import { Event } from "./Event";

/**
 * A Relay is an event forwarder which functions as a replugabble event pipe.
 * Once created, you can connect an input event to it and it will simply forward
 * events from that input event through its own `event` property. The `input`
 * can be changed at any point in time.
 */
export class Relay<T> implements IDisposable {
    private listening = false;
    private inputEvent: Event<T> = Event.None;
    private inputEventListener: IDisposable = Disposable.None;

    private readonly emitter = new Emitter<T>({
        onFirstListenerDidAdd: () => {
            this.listening = true;
            this.inputEventListener = this.inputEvent(this.emitter.fire, this.emitter);
        },
        onLastListenerRemove: () => {
            this.listening = false;
            this.inputEventListener.dispose();
        }
    });

    readonly event: Event<T> = this.emitter.event;

    set input(event: Event<T>) {
        this.inputEvent = event;
        if (this.listening) {
            this.inputEventListener.dispose();
            this.inputEventListener = event(this.emitter.fire, this.emitter);
        }
    }

    dispose() {
        this.inputEventListener.dispose();
        this.emitter.dispose();
    }
}
