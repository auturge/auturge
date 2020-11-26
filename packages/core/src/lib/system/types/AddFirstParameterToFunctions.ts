/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Allows to add a first parameter to functions of a type.
 */
export type AddFirstParameterToFunctions<Target, TargetFunctionsReturnType, FirstParameter> = {
    [K in keyof Target]: // Function: add param to function
    Target[K] extends (...args: any) => TargetFunctionsReturnType
        ? (firstArg: FirstParameter, ...args: Parameters<Target[K]>) => ReturnType<Target[K]>
        : // Else: just leave as is
          Target[K];
};
