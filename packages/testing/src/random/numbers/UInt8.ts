import { RandomInteger } from "@testing/random/numbers/RandomInteger";

export class UInt8 extends RandomInteger {
    protected static readonly singleton: UInt8 = new UInt8();
    public readonly MIN_VALUE: number = 0;
    public readonly MAX_VALUE: number = Math.pow(2, 8) - 1;
    public readonly BYTE_ARRAY = new Uint8Array(1);
}
