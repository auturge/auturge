import { RandomNumber } from "@testing/random/numbers/RandomNumber";

export abstract class RandomInteger extends RandomNumber {
    protected abstract readonly BYTE_ARRAY:
        | Int8Array
        | Uint8Array
        | Int16Array
        | Uint16Array
        | Int32Array
        | Uint32Array;

    public next(minValue: number = this.MIN_VALUE, maxValue: number = this.MAX_VALUE): number {
        this.validateRange(minValue, maxValue);
        return this.getRandomValueInRange(minValue, maxValue);
    }

    protected validateRange(minValue: number, maxValue: number): void {
        if (Math.ceil(minValue) != minValue) {
            throw new Error("minValue must be an integer.");
        }
        if (Math.floor(maxValue) != maxValue) {
            throw new Error("maxValue must be an integer.");
        }

        if (minValue < this.MIN_VALUE) {
            throw new Error(
                `maxValue must be in the interval [${this.MIN_VALUE}, ${this.MAX_VALUE}].`
            );
        }
        if (maxValue > this.MAX_VALUE) {
            throw new Error(
                `maxValue must be in the interval [${this.MIN_VALUE}, ${this.MAX_VALUE}].`
            );
        }
        if (minValue > maxValue) {
            throw new Error("minValue must be less than (or equal to) maxValue.");
        }
    }

    protected getRandomValueInRange(minValue: number, maxValue: number): number {
        var rval = 0;
        var max_range = maxValue - minValue + 1;

        var bits_needed = Math.ceil(Math.log2(max_range));
        if (bits_needed > 53) {
            throw new Error("We cannot generate numbers larger than 53 bits.");
        }

        var bytes_needed = Math.ceil(bits_needed / 8);
        var mask = Math.pow(2, bits_needed) - 1;

        var p = (bytes_needed - 1) * 8;
        for (var i = 0; i < bytes_needed; i++) {
            rval += this.BYTE_ARRAY[i] * Math.pow(2, p);
            p -= 8;
        }

        // Use & to apply the mask and reduce the number of recursive lookups
        rval = rval & mask;

        if (rval >= max_range) {
            // Integer out of acceptable range
            return this.getRandomValueInRange(minValue, maxValue);
        }
        // Return an integer that falls within the range
        return minValue + rval;
    }
}
