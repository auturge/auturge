import { RandomInteger } from "@testing/random/numbers/RandomInteger";

export class UInt32 extends RandomInteger {
    protected static readonly singleton: UInt32 = new UInt32();
    public readonly MIN_VALUE: number = 0;
    public readonly MAX_VALUE: number = Math.pow(2, 32) - 1;
    public readonly BYTE_ARRAY = new Uint32Array(1);
}
