import { CharacterSet } from "@testing/random/strings/CharacterSets";
import { Int32 } from "@testing/random/numbers/Int32";

export abstract class RandomChar {
    public static char(characterSet: string | CharacterSet = CharacterSet.ATOM): string {
        if (characterSet == null) {
            throw new Error("Argument [characterSet] must not be null or undefined.");
        }

        if (characterSet.length == 0) {
            throw new Error("Argument [characterSet] has zero length (no characters).");
        }

        let index = Int32.next(0, characterSet.length - 1);
        return characterSet[index];
    }

    public static charArray(
        minLength: number = 0,
        maxLength: number = 32,
        characterSet: string | CharacterSet = CharacterSet.ATOM
    ): string[] {
        var arrayLength = Int32.next(minLength, maxLength);
        var result = new Array<string>(arrayLength);
        for (let index = 0; index < arrayLength; index++) {
            result[index] = this.char(characterSet);
        }
        return result;
    }
}
