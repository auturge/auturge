/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { LinkedList } from "../collections/public_api";
import { IDisposable, DisposableStore } from "../disposable/public_api";
import { onUnexpectedError } from "../error-handling/public_api";

import { IEmitterOptions } from "./IEmitterOptions";
import { Event } from "./Event";
import { Listener } from "./Listener";

/**
 * The Emitter can be used to expose an Event to the public
 * to fire it from the insides.
 * Sample:
	class Document {

		private readonly _onDidChange = new Emitter<(value:string)=>any>();

		public onDidChange = this._onDidChange.event;

		// getter-style
		// get onDidChange(): Event<(value:string)=>any> {
		// 	return this._onDidChange.event;
		// }

		private _doIt() {
			//...
			this._onDidChange.fire(value);
		}
	}
 */
export class Emitter<T> {
    private static readonly _noop = function() {};

    private readonly _options?: IEmitterOptions;
    private readonly _leakageMon?: LeakageMonitor;
    private _disposed: boolean = false;
    private _event?: Event<T>;
    private _deliveryQueue?: LinkedList<[Listener<T>, T]>;
    protected _listeners?: LinkedList<Listener<T>>;

    constructor(options?: IEmitterOptions) {
        this._options = options;
        this._leakageMon =
            _globalLeakWarningThreshold > 0
                ? new LeakageMonitor(this._options && this._options.leakWarningThreshold)
                : undefined;
    }

    /**
     * For the public to allow to subscribe
     * to events from this Emitter
     */
    get event(): Event<T> {
        if (!this._event) {
            this._event = (
                listener: (e: T) => any,
                thisArgs?: any,
                disposables?: IDisposable[] | DisposableStore
            ) => {
                if (!this._listeners) {
                    this._listeners = new LinkedList();
                }

                const firstListener = this._listeners.isEmpty();

                if (firstListener && this._options && this._options.onFirstListenerAdd) {
                    this._options.onFirstListenerAdd(this);
                }

                const remove = this._listeners.push(!thisArgs ? listener : [listener, thisArgs]);

                if (firstListener && this._options && this._options.onFirstListenerDidAdd) {
                    this._options.onFirstListenerDidAdd(this);
                }

                if (this._options && this._options.onListenerDidAdd) {
                    this._options.onListenerDidAdd(this, listener, thisArgs);
                }

                // check and record this emitter for potential leakage
                let removeMonitor: (() => void) | undefined;
                if (this._leakageMon) {
                    removeMonitor = this._leakageMon.check(this._listeners.size);
                }

                let result: IDisposable;
                result = {
                    dispose: () => {
                        if (removeMonitor) {
                            removeMonitor();
                        }
                        result.dispose = Emitter._noop;
                        if (!this._disposed) {
                            remove();
                            if (this._options && this._options.onLastListenerRemove) {
                                const hasListeners = this._listeners && !this._listeners.isEmpty();
                                if (!hasListeners) {
                                    this._options.onLastListenerRemove(this);
                                }
                            }
                        }
                    }
                };
                if (disposables instanceof DisposableStore) {
                    disposables.add(result);
                } else if (Array.isArray(disposables)) {
                    disposables.push(result);
                }

                return result;
            };
        }
        return this._event;
    }

    /**
     * To be kept private to fire an event to
     * subscribers
     */
    fire(event: T): void {
        if (this._listeners) {
            // put all [listener,event]-pairs into delivery queue
            // then emit all event. an inner/nested event might be
            // the driver of this

            if (!this._deliveryQueue) {
                this._deliveryQueue = new LinkedList();
            }

            for (let iter = this._listeners.iterator(), e = iter.next(); !e.done; e = iter.next()) {
                this._deliveryQueue.push([e.value, event]);
            }

            while (this._deliveryQueue.size > 0) {
                const [listener, event] = this._deliveryQueue.shift()!;
                try {
                    if (typeof listener === "function") {
                        listener.call(undefined, event);
                    } else {
                        listener[0].call(listener[1], event);
                    }
                } catch (e) {
                    onUnexpectedError(e);
                }
            }
        }
    }

    dispose() {
        if (this._listeners) {
            this._listeners.clear();
        }
        if (this._deliveryQueue) {
            this._deliveryQueue.clear();
        }
        if (this._leakageMon) {
            this._leakageMon.dispose();
        }
        this._disposed = true;
    }
}

let _globalLeakWarningThreshold = -1;

export function setGlobalLeakWarningThreshold(n: number): IDisposable {
    let oldValue = _globalLeakWarningThreshold;
    _globalLeakWarningThreshold = n;
    return {
        dispose() {
            _globalLeakWarningThreshold = oldValue;
        }
    };
}

class LeakageMonitor {
    private _stacks: Map<string, number> | undefined;
    private _warnCountdown: number = 0;

    constructor(
        readonly customThreshold?: number,
        readonly name: string = Math.random()
            .toString(18)
            .slice(2, 5)
    ) {}

    dispose(): void {
        if (this._stacks) {
            this._stacks.clear();
        }
    }

    check(listenerCount: number): undefined | (() => void) {
        let threshold = _globalLeakWarningThreshold;
        if (typeof this.customThreshold === "number") {
            threshold = this.customThreshold;
        }

        if (threshold <= 0 || listenerCount < threshold) {
            return undefined;
        }

        if (!this._stacks) {
            this._stacks = new Map();
        }
        const stack = new Error()
            .stack!.split("\n")
            .slice(3)
            .join("\n");
        const count = this._stacks.get(stack) || 0;
        this._stacks.set(stack, count + 1);
        this._warnCountdown -= 1;

        if (this._warnCountdown <= 0) {
            // only warn on first exceed and then every time the limit
            // is exceeded by 50% again
            this._warnCountdown = threshold * 0.5;

            // find most frequent listener and print warning
            let topStack: string;
            let topCount: number = 0;
            this._stacks.forEach((count, stack) => {
                if (!topStack || topCount < count) {
                    topStack = stack;
                    topCount = count;
                }
            });

            console.warn(
                `[${this.name}] potential listener LEAK detected, having ${listenerCount} listeners already. MOST frequent listener (${topCount}):`
            );
            console.warn(topStack!);
        }

        return () => {
            const count = this._stacks!.get(stack) || 0;
            this._stacks!.set(stack, count - 1);
        };
    }
}
