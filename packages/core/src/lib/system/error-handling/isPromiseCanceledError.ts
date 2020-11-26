/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export const canceledName = "Canceled";

/**
 * Checks if the given error is a promise in canceled state
 */
export function isPromiseCanceledError(error: any): boolean {
    return error instanceof Error && error.name === canceledName && error.message === canceledName;
}
