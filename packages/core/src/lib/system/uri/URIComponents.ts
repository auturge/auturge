/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export interface URIComponents {
    scheme: string;
    authority: string;
    path: string;
    query: string;
    fragment: string;
}
