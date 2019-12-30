/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Event } from "./Event";

/**
 * The EventBufferer is useful in situations in which you want
 * to delay firing your events during some code.
 * You can wrap that code and be sure that the event will not
 * be fired during that wrap.
 *
 * ```
 * const emitter: Emitter;
 * const delayer = new EventDelayer();
 * const delayedEvent = delayer.wrapEvent(emitter.event);
 *
 * delayedEvent(console.log);
 *
 * delayer.bufferEvents(() => {
 *   emitter.fire(); // event will not be fired yet
 * });
 *
 * // event will only be fired at this point
 * ```
 */
export class EventBufferer {
    private buffers: Function[][] = [];

    wrapEvent<T>(event: Event<T>): Event<T> {
        return (listener, thisArgs?, disposables?) => {
            return event(
                (i) => {
                    const buffer = this.buffers[this.buffers.length - 1];
                    if (buffer) {
                        buffer.push(() => listener.call(thisArgs, i));
                    } else {
                        listener.call(thisArgs, i);
                    }
                },
                undefined,
                disposables
            );
        };
    }

    bufferEvents<R = void>(fn: () => R): R {
        const buffer: Array<() => R> = [];
        this.buffers.push(buffer);
        const r = fn();
        this.buffers.pop();
        buffer.forEach((flush) => flush());
        return r;
    }
}
