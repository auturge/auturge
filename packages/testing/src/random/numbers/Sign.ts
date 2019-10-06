import { Int8 } from "@testing/random/numbers/Int8";

export class Sign {
    private static singleton: Sign = new Sign();

    next(includeZero: boolean): number {
        if (!includeZero) {
            return Math.random() > 0.5 ? 1 : -1;
        }

        return Math.sign(Int8.next(-1, 1));
    }

    public static next(includeZero: boolean = false): number {
        return this.singleton.next(includeZero);
    }
}
