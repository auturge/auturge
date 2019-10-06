import { RandomInteger } from "@testing/random/numbers/RandomInteger";

export class Int32 extends RandomInteger {
    protected static readonly singleton: Int32 = new Int32();
    public readonly MIN_VALUE: number = -2147483648;
    public readonly MAX_VALUE: number = 2147483647;
    public readonly BYTE_ARRAY = new Int32Array(1);
}
