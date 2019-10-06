import { RandomInteger } from "@testing/random/numbers/RandomInteger";

export class Int8 extends RandomInteger {
    protected static readonly singleton: Int8 = new Int8();
    public readonly MIN_VALUE: number = -128;
    public readonly MAX_VALUE: number = 127;
    public readonly BYTE_ARRAY: Int8Array = new Int8Array(1);
}
