import { RandomInteger } from "@testing/random/numbers/RandomInteger";

export class Int16 extends RandomInteger {
    protected static readonly singleton: Int16 = new Int16();
    public readonly MIN_VALUE: number = -32768;
    public readonly MAX_VALUE: number = 32767;
    public readonly BYTE_ARRAY = new Int16Array(1);
}
