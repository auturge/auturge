/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Represents a UUID as defined by rfc4122.
 */
export interface UUID {
    /**
     * @returns the canonical representation in sets of hexadecimal numbers separated by dashes.
     */
    asHex(): string;
}
