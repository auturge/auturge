import { CharacterSet } from "@testing/random/strings/CharacterSets";
import { RandomChar } from "@testing/random/strings/RandomChar";

export abstract class RandomString {
    public static string(
        minLength: number = 0,
        maxLength: number = 32,
        characterSet: string | CharacterSet = CharacterSet.ATOM
    ): string {
        var chars = RandomChar.charArray(minLength, maxLength, characterSet);
        return chars.join("");
    }
}
