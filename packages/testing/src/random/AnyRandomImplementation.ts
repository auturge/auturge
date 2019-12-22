import { RandomObjectGenerator } from "./RandomObjectGenerator";
import {
    Scale,
    Sign,
    Int8,
    UInt8,
    Int16,
    UInt16,
    Int32,
    UInt32,
    Double,
    Single
} from "./numbers/__public_api";
import { RandomDate } from "./dates/__public_api";
import { CharacterSet, RandomChar, RandomString } from "./strings/__public_api";

export class AnyRandomImplementation implements RandomObjectGenerator {
    boolean(): boolean {
        return Math.random() < 0.5;
    }

    date(earliest: Date, latest: Date): Date {
        return RandomDate.next(earliest, latest);
    }

    sign(includeZero: boolean): number {
        return Sign.next(includeZero);
    }

    int8(minValue: number, maxValue: number): number {
        return Int8.next(minValue, maxValue);
    }
    uint8(minValue: number, maxValue: number): number {
        return UInt8.next(minValue, maxValue);
    }

    int16(minValue: number, maxValue: number): number {
        return Int16.next(minValue, maxValue);
    }
    uint16(minValue: number, maxValue: number): number {
        return UInt16.next(minValue, maxValue);
    }

    int32(minValue: number, maxValue: number): number {
        return Int32.next(minValue, maxValue);
    }
    uint32(minValue: number, maxValue: number): number {
        return UInt32.next(minValue, maxValue);
    }

    double(minValue: number, maxValue: number, scale: Scale): number {
        return Double.next(minValue, maxValue, scale);
    }
    single(minValue: number, maxValue: number, scale: Scale): number {
        return Single.next(minValue, maxValue, scale);
    }

    char(characterSet: string | CharacterSet): string {
        return RandomChar.char(characterSet);
    }
    charArray(
        minLength: number,
        maxLength: number,
        characterSet: string | CharacterSet
    ): string[] {
        return RandomChar.charArray(minLength, maxLength, characterSet);
    }
    string(
        minLength: number,
        maxLength: number,
        characterSet: string | CharacterSet
    ): string {
        return RandomString.string(minLength, maxLength, characterSet);
    }
}
