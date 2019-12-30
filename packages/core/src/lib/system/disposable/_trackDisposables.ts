/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "./IDisposable";
import { Disposable } from "./Disposable";

/**
 * Enables logging of potentially leaked disposables.
 *
 * A disposable is considered leaked if it is not disposed or not registered as the child of
 * another disposable. This tracking is very simple an only works for classes that either
 * extend Disposable or use a DisposableStore. This means there are a lot of false positives.
 */
const TRACK_DISPOSABLES = false;

const __is_disposable_tracked__ = "__is_disposable_tracked__";

export function markTracked<T extends IDisposable>(x: T): void {
    if (!TRACK_DISPOSABLES) {
        return;
    }

    if (x && x !== Disposable.None) {
        try {
            (x as any)[__is_disposable_tracked__] = true;
        } catch {
            // noop
        }
    }
}

export function trackDisposable<T extends IDisposable>(x: T): T {
    if (!TRACK_DISPOSABLES) {
        return x;
    }

    const stack = new Error("Potentially leaked disposable").stack!;
    setTimeout(() => {
        if (!(x as any)[__is_disposable_tracked__]) {
            console.log(stack);
        }
    }, 3000);
    return x;
}
