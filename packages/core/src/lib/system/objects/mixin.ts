/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { isObject } from "../types/isObject";

/**
 * Copies all properties of source into destination. The optional parameter "overwrite" allows to control
 * if existing properties on the destination should be overwritten or not. Defaults to true (overwrite).
 */
export function mixin(destination: any, source: any, overwrite: boolean = true): any {
    if (!isObject(destination)) {
        return source;
    }
    if (isObject(source)) {
        Object.keys(source).forEach((key) => {
            if (key in destination) {
                if (overwrite) {
                    if (isObject(destination[key]) && isObject(source[key])) {
                        mixin(destination[key], source[key], overwrite);
                    } else {
                        destination[key] = source[key];
                    }
                }
            } else {
                destination[key] = source[key];
            }
        });
    }
    return destination;
}
