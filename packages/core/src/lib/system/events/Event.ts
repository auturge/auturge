/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {
    combinedDisposable,
    IDisposable,
    Disposable,
    DisposableStore
} from "../disposable/public_api";
import { Emitter } from "./Emitter";

/**
 * To an event a function with one or zero parameters
 * can be subscribed. The event is the subscriber function itself.
 */
export interface Event<T> {
    (
        listener: (e: T) => any,
        thisArgs?: any,
        disposables?: IDisposable[] | DisposableStore
    ): IDisposable;
}

export namespace Event {
    export const None: Event<any> = () => Disposable.None;

    /**
     * Given an event, returns another event which only fires once.
     */
    export function once<T>(event: Event<T>): Event<T> {
        return (listener, thisArgs = null, disposables?) => {
            // we need this, in case the event fires during the listener call
            let didFire = false;
            let result: IDisposable;
            result = event(
                (e) => {
                    if (didFire) {
                        return;
                    } else if (result) {
                        result.dispose();
                    } else {
                        didFire = true;
                    }

                    return listener.call(thisArgs, e);
                },
                null,
                disposables
            );

            if (didFire) {
                result.dispose();
            }

            return result;
        };
    }

    /**
     * Given an event and a `map` function, returns another event which maps each element
     * through the mapping function.
     */
    export function map<I, O>(event: Event<I>, map: (i: I) => O): Event<O> {
        return snapshot((listener, thisArgs = null, disposables?) =>
            event((i) => listener.call(thisArgs, map(i)), null, disposables)
        );
    }

    /**
     * Given an event and an `each` function, returns another identical event and calls
     * the `each` function per each element.
     */
    export function forEach<I>(event: Event<I>, each: (i: I) => void): Event<I> {
        return snapshot((listener, thisArgs = null, disposables?) =>
            event(
                (i) => {
                    each(i);
                    listener.call(thisArgs, i);
                },
                null,
                disposables
            )
        );
    }

    /**
     * Given an event and a `filter` function, returns another event which emits those
     * elements for which the `filter` function returns `true`.
     */
    export function filter<T>(event: Event<T>, filter: (e: T) => boolean): Event<T>;
    export function filter<T, R>(event: Event<T | R>, filter: (e: T | R) => e is R): Event<R>;
    export function filter<T>(event: Event<T>, filter: (e: T) => boolean): Event<T> {
        return snapshot((listener, thisArgs = null, disposables?) =>
            event((e) => filter(e) && listener.call(thisArgs, e), null, disposables)
        );
    }

    /**
     * Given an event, returns the same event but typed as `Event<void>`.
     */
    export function signal<T>(event: Event<T>): Event<void> {
        return (event as Event<any>) as Event<void>;
    }

    /**
     * Given a collection of events, returns a single event which emits
     * whenever any of the provided events emit.
     */
    export function any<T>(...events: Event<T>[]): Event<T> {
        return (listener, thisArgs = null, disposables?) =>
            combinedDisposable(
                ...events.map((event) =>
                    event((e) => listener.call(thisArgs, e), null, disposables)
                )
            );
    }

    /**
     * Given an event and a `merge` function, returns another event which maps each element
     * and the cumulative result through the `merge` function. Similar to `map`, but with memory.
     */
    export function reduce<I, O>(
        event: Event<I>,
        merge: (last: O | undefined, event: I) => O,
        initial?: O
    ): Event<O> {
        let output: O | undefined = initial;

        return map<I, O>(event, (e) => {
            output = merge(output, e);
            return output;
        });
    }

    /**
     * Given a chain of event processing functions (filter, map, etc), each
     * function will be invoked per event & per listener. Snapshotting an event
     * chain allows each function to be invoked just once per event.
     */
    export function snapshot<T>(event: Event<T>): Event<T> {
        let listener: IDisposable;
        const emitter = new Emitter<T>({
            onFirstListenerAdd() {
                listener = event(emitter.fire, emitter);
            },
            onLastListenerRemove() {
                listener.dispose();
            }
        });

        return emitter.event;
    }

    /**
     * Debounces the provided event, given a `merge` function.
     *
     * @param event The input event.
     * @param merge The reducing function.
     * @param delay The debouncing delay in millis.
     * @param leading Whether the event should fire in the leading phase of the timeout.
     * @param leakWarningThreshold The leak warning threshold override.
     */
    export function debounce<T>(
        event: Event<T>,
        merge: (last: T | undefined, event: T) => T,
        delay?: number,
        leading?: boolean,
        leakWarningThreshold?: number
    ): Event<T>;
    export function debounce<I, O>(
        event: Event<I>,
        merge: (last: O | undefined, event: I) => O,
        delay?: number,
        leading?: boolean,
        leakWarningThreshold?: number
    ): Event<O>;
    export function debounce<I, O>(
        event: Event<I>,
        merge: (last: O | undefined, event: I) => O,
        delay: number = 100,
        leading = false,
        leakWarningThreshold?: number
    ): Event<O> {
        let subscription: IDisposable;
        let output: O | undefined = undefined;
        let handle: any = undefined;
        let numDebouncedCalls = 0;

        const emitter = new Emitter<O>({
            leakWarningThreshold,
            onFirstListenerAdd() {
                subscription = event((cur) => {
                    numDebouncedCalls++;
                    output = merge(output, cur);

                    if (leading && !handle) {
                        emitter.fire(output);
                    }

                    clearTimeout(handle);
                    handle = setTimeout(() => {
                        const _output = output;
                        output = undefined;
                        handle = undefined;
                        if (!leading || numDebouncedCalls > 1) {
                            emitter.fire(_output!);
                        }

                        numDebouncedCalls = 0;
                    }, delay);
                });
            },
            onLastListenerRemove() {
                subscription.dispose();
            }
        });

        return emitter.event;
    }

    /**
     * Given an event, it returns another event which fires only once and as soon as
     * the input event emits. The event data is the number of millis it took for the
     * event to fire.
     */
    export function stopwatch<T>(event: Event<T>): Event<number> {
        const start = new Date().getTime();
        return map(once(event), (_) => new Date().getTime() - start);
    }

    /**
     * Given an event, it returns another event which fires only when the event
     * element changes.
     */
    export function latch<T>(event: Event<T>): Event<T> {
        let firstCall = true;
        let cache: T;

        return filter(event, (value) => {
            const shouldEmit = firstCall || value !== cache;
            firstCall = false;
            cache = value;
            return shouldEmit;
        });
    }

    /**
     * Buffers the provided event until a first listener comes
     * along, at which point fire all the events at once and
     * pipe the event from then on.
     *
     * ```typescript
     * const emitter = new Emitter<number>();
     * const event = emitter.event;
     * const bufferedEvent = buffer(event);
     *
     * emitter.fire(1);
     * emitter.fire(2);
     * emitter.fire(3);
     * // nothing...
     *
     * const listener = bufferedEvent(num => console.log(num));
     * // 1, 2, 3
     *
     * emitter.fire(4);
     * // 4
     * ```
     */
    export function buffer<T>(event: Event<T>, nextTick = false, _buffer: T[] = []): Event<T> {
        let buffer: T[] | null = _buffer.slice();

        let listener: IDisposable | null = event((e) => {
            if (buffer) {
                buffer.push(e);
            } else {
                emitter.fire(e);
            }
        });

        const flush = () => {
            if (buffer) {
                buffer.forEach((e) => emitter.fire(e));
            }
            buffer = null;
        };

        const emitter = new Emitter<T>({
            onFirstListenerAdd() {
                if (!listener) {
                    listener = event((e) => emitter.fire(e));
                }
            },

            onFirstListenerDidAdd() {
                if (buffer) {
                    if (nextTick) {
                        setTimeout(flush);
                    } else {
                        flush();
                    }
                }
            },

            onLastListenerRemove() {
                if (listener) {
                    listener.dispose();
                }
                listener = null;
            }
        });

        return emitter.event;
    }

    export interface IChainableEvent<T> {
        event: Event<T>;
        map<O>(fn: (i: T) => O): IChainableEvent<O>;
        forEach(fn: (i: T) => void): IChainableEvent<T>;
        filter(fn: (e: T) => boolean): IChainableEvent<T>;
        reduce<R>(merge: (last: R | undefined, event: T) => R, initial?: R): IChainableEvent<R>;
        latch(): IChainableEvent<T>;
        debounce(
            merge: (last: T | undefined, event: T) => T,
            delay?: number,
            leading?: boolean,
            leakWarningThreshold?: number
        ): IChainableEvent<T>;
        debounce<R>(
            merge: (last: R | undefined, event: T) => R,
            delay?: number,
            leading?: boolean,
            leakWarningThreshold?: number
        ): IChainableEvent<R>;
        on(
            listener: (e: T) => any,
            thisArgs?: any,
            disposables?: IDisposable[] | DisposableStore
        ): IDisposable;
        once(listener: (e: T) => any, thisArgs?: any, disposables?: IDisposable[]): IDisposable;
    }

    class ChainableEvent<T> implements IChainableEvent<T> {
        constructor(readonly event: Event<T>) {}

        map<O>(fn: (i: T) => O): IChainableEvent<O> {
            return new ChainableEvent(map(this.event, fn));
        }

        forEach(fn: (i: T) => void): IChainableEvent<T> {
            return new ChainableEvent(forEach(this.event, fn));
        }

        filter(fn: (e: T) => boolean): IChainableEvent<T> {
            return new ChainableEvent(filter(this.event, fn));
        }

        reduce<R>(merge: (last: R | undefined, event: T) => R, initial?: R): IChainableEvent<R> {
            return new ChainableEvent(reduce(this.event, merge, initial));
        }

        latch(): IChainableEvent<T> {
            return new ChainableEvent(latch(this.event));
        }

        debounce(
            merge: (last: T | undefined, event: T) => T,
            delay?: number,
            leading?: boolean,
            leakWarningThreshold?: number
        ): IChainableEvent<T>;
        debounce<R>(
            merge: (last: R | undefined, event: T) => R,
            delay?: number,
            leading?: boolean,
            leakWarningThreshold?: number
        ): IChainableEvent<R>;
        debounce<R>(
            merge: (last: R | undefined, event: T) => R,
            delay: number = 100,
            leading = false,
            leakWarningThreshold?: number
        ): IChainableEvent<R> {
            return new ChainableEvent(
                debounce(this.event, merge, delay, leading, leakWarningThreshold)
            );
        }

        on(listener: (e: T) => any, thisArgs: any, disposables: IDisposable[] | DisposableStore) {
            return this.event(listener, thisArgs, disposables);
        }

        once(listener: (e: T) => any, thisArgs: any, disposables: IDisposable[]) {
            return once(this.event)(listener, thisArgs, disposables);
        }
    }

    export function chain<T>(event: Event<T>): IChainableEvent<T> {
        return new ChainableEvent(event);
    }

    export interface NodeEventEmitter {
        on(event: string | symbol, listener: Function): this;
        removeListener(event: string | symbol, listener: Function): this;
    }

    export function fromNodeEventEmitter<T>(
        emitter: NodeEventEmitter,
        eventName: string,
        map: (...args: any[]) => T = (id) => id
    ): Event<T> {
        const fn = (...args: any[]) => result.fire(map(...args));
        const onFirstListenerAdd = () => emitter.on(eventName, fn);
        const onLastListenerRemove = () => emitter.removeListener(eventName, fn);
        const result = new Emitter<T>({ onFirstListenerAdd, onLastListenerRemove });

        return result.event;
    }

    export interface DOMEventEmitter {
        addEventListener(event: string | symbol, listener: Function): void;
        removeEventListener(event: string | symbol, listener: Function): void;
    }

    export function fromDOMEventEmitter<T>(
        emitter: DOMEventEmitter,
        eventName: string,
        map: (...args: any[]) => T = (id) => id
    ): Event<T> {
        const fn = (...args: any[]) => result.fire(map(...args));
        const onFirstListenerAdd = () => emitter.addEventListener(eventName, fn);
        const onLastListenerRemove = () => emitter.removeEventListener(eventName, fn);
        const result = new Emitter<T>({ onFirstListenerAdd, onLastListenerRemove });

        return result.event;
    }

    export function fromPromise<T = any>(promise: Promise<T>): Event<undefined> {
        const emitter = new Emitter<undefined>();
        let shouldEmit = false;

        promise
            .then(undefined, () => null)
            .then(() => {
                if (!shouldEmit) {
                    setTimeout(() => emitter.fire(undefined), 0);
                } else {
                    emitter.fire(undefined);
                }
            });

        shouldEmit = true;
        return emitter.event;
    }

    export function toPromise<T>(event: Event<T>): Promise<T> {
        return new Promise((c) => once(event)(c));
    }
}
