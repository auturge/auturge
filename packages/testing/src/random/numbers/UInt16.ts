import { RandomInteger } from "@testing/random/numbers/RandomInteger";

export class UInt16 extends RandomInteger {
    protected static readonly singleton: UInt16 = new UInt16();
    public readonly MIN_VALUE: number = 0;
    public readonly MAX_VALUE: number = Math.pow(2, 16) - 1;
    public readonly BYTE_ARRAY = new Uint16Array(1);
}
