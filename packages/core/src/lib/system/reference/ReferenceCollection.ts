/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE_VSCODE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IReference } from "./IReference";
import { once } from "../functional/once";

export abstract class ReferenceCollection<T> {
    private readonly references: Map<string, { readonly object: T; counter: number }> = new Map();

    acquire(key: string): IReference<T> {
        let reference = this.references.get(key);

        if (!reference) {
            reference = { counter: 0, object: this.createReferencedObject(key) };
            this.references.set(key, reference);
        }

        const { object } = reference;
        const dispose = once(() => {
            if (--reference!.counter === 0) {
                this.destroyReferencedObject(key, reference!.object);
                this.references.delete(key);
            }
        });

        reference.counter++;

        return { object, dispose };
    }

    protected abstract createReferencedObject(key: string): T;
    protected abstract destroyReferencedObject(key: string, object: T): void;
}
