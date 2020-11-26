import { Event } from "../events/Event";
import { IDisposable } from "../disposable/IDisposable";
import { MutableToken } from "./MutableToken";

export interface CancellationToken {
    readonly isCancellationRequested: boolean;

    /**
     * An event emitted when cancellation is requested
     * @event
     */
    readonly onCancellationRequested: Event<any>;
}

export const shortcutEvent = Object.freeze(function(callback, context?): IDisposable {
    const handle = setTimeout(callback.bind(context), 0);
    return {
        dispose() {
            clearTimeout(handle);
        }
    };
} as Event<any>);

export namespace CancellationToken {
    export function isCancellationToken(thing: any): thing is CancellationToken {
        if (thing === CancellationToken.None || thing === CancellationToken.Cancelled) {
            return true;
        }
        if (thing instanceof MutableToken) {
            return true;
        }
        if (!thing || typeof thing !== "object") {
            return false;
        }
        return (
            typeof (thing as CancellationToken).isCancellationRequested === "boolean" &&
            typeof (thing as CancellationToken).onCancellationRequested === "function"
        );
    }

    export const None: CancellationToken = Object.freeze({
        isCancellationRequested: false,
        onCancellationRequested: Event.None
    });

    export const Cancelled: CancellationToken = Object.freeze({
        isCancellationRequested: true,
        onCancellationRequested: shortcutEvent
    });
}
