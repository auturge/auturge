import { Scale } from "@testing/random/numbers/Scale";

export abstract class RandomScaledNumber {
    protected static readonly singleton: RandomScaledNumber;
    public abstract readonly MIN_VALUE: number;
    public abstract readonly MAX_VALUE: number;
    protected abstract next(minValue: number, maxValue: number, scale: Scale): number;

    public static get MIN_VALUE(): number {
        return this.singleton.MIN_VALUE;
    }

    public static get MAX_VALUE(): number {
        return this.singleton.MAX_VALUE;
    }

    public static next(
        minValue: number = this.MIN_VALUE,
        maxValue: number = this.MAX_VALUE,
        scale: Scale = Scale.Exponential
    ): number {
        return this.singleton.next(minValue, maxValue, scale);
    }
}
