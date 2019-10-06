import { RandomScaledNumber } from "@testing/random/numbers/RandomScaledNumber";
import { Scale } from "@testing/random/numbers/Scale";
import { Double } from "@testing/random/numbers/Double";

/** Single-precision floating-point number */
export class Single extends RandomScaledNumber {
    protected next(minValue: number, maxValue: number, scale: Scale): number {
        let double = Double.next(minValue, maxValue, scale);
        let fround = Math.fround || Single.fround;
        return fround(double);
    }
    protected static readonly singleton: Single = new Single();
    public readonly MIN_VALUE: number = Number.NEGATIVE_INFINITY;
    public readonly MAX_VALUE: number = Number.POSITIVE_INFINITY;

    private static fround(value: number): number {
        var temp = new Float32Array(1);
        temp[0] = +value;
        return temp[0];
    }
}
