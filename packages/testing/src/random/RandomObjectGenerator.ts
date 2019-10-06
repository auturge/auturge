import { CharacterSet } from "@testing/random/strings/CharacterSets";
import { Scale } from "@testing/random/numbers/Scale";

export interface RandomObjectGenerator {
    /**
     * @returns a random boolean value (`true` or `false`).
     */
    boolean(): boolean;

    sign(includeZero: boolean): number;

    /**
     * Returns a random unsigned `Byte` (8-bit integer) within the range defined by `minValue` and
     *     `maxValue`.
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     */
    uint8(minValue: number, maxValue: number): number;

    /**
     * Returns a random signed `Byte` (8-bit integer) within the range [0, 255].
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     */
    int8(minValue: number, maxValue: number): number;

    int16(minValue: number, maxValue: number): number;
    int32(minValue: number, maxValue: number): number;

    uint16(minValue: number, maxValue: number): number;
    uint32(minValue: number, maxValue: number): number;

    double(minValue: number, maxValue: number, scale: Scale): number;

    single(minValue: number, maxValue: number, scale: Scale): number;

    char(characterSet: string | CharacterSet): string;

    charArray(minLength: number, maxLength: number, characterSet: string | CharacterSet): string[];

    date(earliest: Date, latest: Date): Date;

    string(minLength: number, maxLength: number, characterSet: string | CharacterSet): string;
}
