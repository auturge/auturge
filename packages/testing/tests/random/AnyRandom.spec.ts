import { AnyRandom } from "@testing/random/AnyRandom";
import { CharacterSet } from "@testing/random/strings/__public_api";

function getSubInterval(min, max) {
    let range = max - min + 1;
    let minimum = min + Math.floor(Math.random() * range);
    let maximum = min + Math.floor(Math.random() * range);

    if (minimum > maximum) {
        [minimum, maximum] = [maximum, minimum];
    }

    return [minimum, maximum];
}

describe("AnyRandom Implementation", () => {
    describe("boolean", () => {
        it("boolean - returns either true or false", () => {
            let result = AnyRandom.boolean();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(typeof result === "boolean").toBeTruthy();
        });
    });

    describe("date", () => {
        it("date - returns a date between two provided dates", () => {
            let earliest: Date = new Date();
            let latest: Date = new Date();
            latest.setFullYear(earliest.getFullYear() + 1);

            // do this 1000 times, to be sure!
            for (let int = 0; int < 1; int++) {
                let result = AnyRandom.date(earliest, latest);

                expect(result).not.toBeNull();
                expect(result).not.toBeUndefined();
                expect(typeof result === "object").toBeTruthy();
                expect(result instanceof Date).toBeTruthy();
                expect(result >= earliest).toBe(true);
                expect(result <= latest).toBe(true);
            }
        });
    });

    describe("sign", () => {
        it("sign - returns either +1 or -1", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.sign();

                expect(result).not.toBeNull();
                expect(result).not.toBeUndefined();
                expect(typeof result === "number").toBeTruthy();
                expect(result === -1 || result === +1).toBe(true);
            }
        });

        it("sign - when includeZero is true, returns either +1, zero, or -1", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.sign(true);

                expect(result).not.toBeNull();
                expect(result).not.toBeUndefined();
                expect(typeof result === "number").toBeTruthy();
                expect(result === -1 || result === 0 || result === +1).toBe(true);
            }
        });
    });

    describe("int8", () => {
        it("int8 - when provided a range, returns an integer in that interval", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let [min, max] = getSubInterval(-128, 127);

                let result = AnyRandom.int8(min, max);

                expect(result).not.toBeNull();
                expect(result).not.toBeUndefined();
                expect(typeof result === "number").toBeTruthy();
                expect(result).toBeGreaterThanOrEqual(min);
                expect(result).toBeLessThanOrEqual(max);
            }
        });
        it("int8 - returns n signed int8 on the interval [-128, 127]", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 100; int++) {
                let result = AnyRandom.int8();

                expect(result).not.toBeNull();
                expect(result).not.toBeUndefined();
                expect(typeof result === "number").toBeTruthy();
                expect(result).toBeGreaterThanOrEqual(-128);
                expect(result).toBeLessThanOrEqual(127);
            }
        });
        it("int8 - throws an error if the minValue is less than -128", () => {
            expect(() => {
                AnyRandom.uint8(-129, 20);
            }).toThrow();
        });
        it("int8 - throws an error if the maxValue is greater than 127", () => {
            expect(() => {
                AnyRandom.int8(0, 128);
            }).toThrow();
        });
        it("int8 - throws an error if the maxValue is not an integer", () => {
            expect(() => {
                AnyRandom.int8(0, 12.5);
            }).toThrow();
        });
        it("int8 - throws an error if the minValue is not an integer", () => {
            expect(() => {
                AnyRandom.int8(3.14, 12);
            }).toThrow();
        });
    });
    describe("uint8", () => {
        it("uint8 - when provided a range, returns an integer in that interval", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let [min, max] = getSubInterval(0, 255);

                let result = AnyRandom.uint8(min, max);

                expect(result).not.toBeNull();
                expect(result).not.toBeUndefined();
                expect(typeof result === "number").toBeTruthy();
                expect(result).toBeGreaterThanOrEqual(min);
                expect(result).toBeLessThanOrEqual(max);
            }
        });
        it("uint8 - returns an integer on the interval [0, 255]", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.uint8();

                expect(result).not.toBeNull();
                expect(result).not.toBeUndefined();
                expect(typeof result === "number").toBeTruthy();
                expect(result).toBeGreaterThanOrEqual(0);
                expect(result).toBeLessThanOrEqual(255);
            }
        });
        it("uint8 - throws an error if the minValue is less than zero", () => {
            expect(() => {
                AnyRandom.uint8(-12, 20);
            }).toThrow();
        });
        it("uint8 - throws an error if the maxValue is greater than 255", () => {
            expect(() => {
                AnyRandom.uint8(0, 256);
            }).toThrow();
        });
        it("uint8 - throws an error if the maxValue is not an integer", () => {
            expect(() => {
                AnyRandom.uint8(0, 12.5);
            }).toThrow();
        });
        it("uint8 - throws an error if the minValue is not an integer", () => {
            expect(() => {
                AnyRandom.uint8(3.14, 12);
            }).toThrow();
        });
    });

    describe("int16", () => {
        it("int16 - returns n signed int8 on the interval [-32768, 32767]", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.int16();

                expect(result).not.toBeNull();
                expect(result).not.toBeUndefined();
                expect(typeof result === "number").toBeTruthy();
                expect(result).toBeGreaterThanOrEqual(-32768);
                expect(result).toBeLessThanOrEqual(32767);
            }
        });
        it("int16 - throws an error if the minValue is less than -32768", () => {
            expect(() => {
                AnyRandom.int16(-32769, 20);
            }).toThrow();
        });
        it("int16 - throws an error if the maxValue is greater than 32767", () => {
            expect(() => {
                AnyRandom.int16(0, 32768);
            }).toThrow();
        });
        it("int16 - throws an error if the maxValue is not an integer", () => {
            expect(() => {
                AnyRandom.int16(0, 12.5);
            }).toThrow();
        });
        it("int16 - throws an error if the minValue is not an integer", () => {
            expect(() => {
                AnyRandom.int16(3.14, 12);
            }).toThrow();
        });
    });
    describe("uint16", () => {
        it("uint16 - returns an integer on the interval [0, 65535]", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.uint16();

                expect(result).not.toBeNull();
                expect(result).not.toBeUndefined();
                expect(typeof result === "number").toBeTruthy();
                expect(result).toBeGreaterThanOrEqual(0);
                expect(result).toBeLessThanOrEqual(65535);
            }
        });
        it("uint16 - throws an error if the minValue is less than zero", () => {
            expect(() => {
                AnyRandom.uint16(-12, 20);
            }).toThrow();
        });
        it("uint16 - throws an error if the maxValue is greater than 65535", () => {
            expect(() => {
                AnyRandom.uint16(0, 65536);
            }).toThrow();
        });
        it("uint16 - throws an error if the maxValue is not an integer", () => {
            expect(() => {
                AnyRandom.uint16(0, 12.5);
            }).toThrow();
        });
        it("uint16 - throws an error if the minValue is not an integer", () => {
            expect(() => {
                AnyRandom.uint16(3.14, 12);
            }).toThrow();
        });
    });

    describe("int32", () => {
        it("int32 - returns an integer on the interval [-2147483648, 2147483647]", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.int32();

                expect(result).not.toBeNull();
                expect(result).not.toBeUndefined();
                expect(typeof result === "number").toBeTruthy();
                expect(result).toBeGreaterThanOrEqual(-2147483648);
                expect(result).toBeLessThanOrEqual(2147483647);
            }
        });
        it("int32 - throws an error if the minValue is less than -2147483648", () => {
            expect(() => {
                AnyRandom.int32(-2147483649, 20);
            }).toThrow();
        });
        it("int32 - throws an error if the maxValue is greater than 2147483647", () => {
            expect(() => {
                AnyRandom.int32(0, 2147483648);
            }).toThrow();
        });
        it("int32 - throws an error if the maxValue is not an integer", () => {
            expect(() => {
                AnyRandom.int32(0, 12.5);
            }).toThrow();
        });
        it("int32 - throws an error if the minValue is not an integer", () => {
            expect(() => {
                AnyRandom.int32(3.14, 12);
            }).toThrow();
        });
    });
    describe("uint32", () => {
        it("uint32 - returns an integer on the interval [0, 4294967295]", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.uint32();

                expect(result).not.toBeNull();
                expect(result).not.toBeUndefined();
                expect(typeof result === "number").toBeTruthy();
                expect(result).toBeGreaterThanOrEqual(0);
                expect(result).toBeLessThanOrEqual(4294967295);
            }
        });
        it("uint32 - throws an error if the minValue is less than zero", () => {
            expect(() => {
                AnyRandom.uint32(-1, 20);
            }).toThrow();
        });
        it("uint32 - throws an error if the maxValue is greater than 4294967295", () => {
            expect(() => {
                AnyRandom.uint32(0, 4294967296);
            }).toThrow();
        });
        it("uint32 - throws an error if the maxValue is not an integer", () => {
            expect(() => {
                AnyRandom.uint32(0, 12.5);
            }).toThrow();
        });
        it("uint32 - throws an error if the minValue is not an integer", () => {
            expect(() => {
                AnyRandom.uint32(3.14, 12);
            }).toThrow();
        });
    });

    describe("double", () => {
        it("double - returns a 64-bit floating point number", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.double();

                expect(result).not.toBeNull();
                expect(result).not.toBeUndefined();
                expect(typeof result === "number").toBeTruthy();
                expect(result).toBeGreaterThanOrEqual(Number.NEGATIVE_INFINITY);
                expect(result).toBeLessThanOrEqual(Number.POSITIVE_INFINITY);
            }
        });
    });
    describe("single", () => {
        it("single - returns a single-precision 32-bit floating point number", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.single();

                expect(result).not.toBeNull();
                expect(result).not.toBeUndefined();
                expect(typeof result === "number").toBeTruthy();
                expect(result).toBeGreaterThanOrEqual(Number.NEGATIVE_INFINITY);
                expect(result).toBeLessThanOrEqual(Number.POSITIVE_INFINITY);
            }
        });
    });

    describe("char", () => {
        it(`char - given no inputs, returns a single character from the ATOM CharacterSet`, () => {
            let result = AnyRandom.char();

            expect(result).not.toBeFalsy();
            expect(typeof result === "string").toBe(true);
            expect(result.length).toEqual(1);
            expect(CharacterSet.ATOM.includes(result)).toBe(true);
        });

        [
            { key: "alphabetical characters", value: CharacterSet.ALPHA.toString() },
            { key: "alphanumeric characters", value: CharacterSet.ALPHANUMERIC.toString() },
            { key: "atomic characters", value: CharacterSet.ATOM.toString() },
            { key: "numbers", value: CharacterSet.NUMERIC.toString() },
            { key: "url-safe symbols", value: CharacterSet.SYMBOLS.toString() }
        ].forEach(({ key, value }) => {
            it(`char - given a string input composed of ${key}, returns a single character from that string`, () => {
                let characterSet: string = value;

                let result = AnyRandom.char(characterSet);

                expect(result).not.toBeFalsy();
                expect(typeof result === "string").toBe(true);
                expect(result.length).toEqual(1);
                expect(characterSet.includes(result)).toBe(true);
            });
        });

        [
            { key: "ALPHA", set: CharacterSet.ALPHA },
            { key: "ALPHANUMERIC", set: CharacterSet.ALPHANUMERIC },
            { key: "ATOM", set: CharacterSet.ATOM },
            { key: "NUMERIC", set: CharacterSet.NUMERIC },
            { key: "SYMBOLS", set: CharacterSet.SYMBOLS }
        ].forEach(({ key, set }) => {
            it(`char - given the CharacterSet [${key}], returns a single character from that CharacterSet`, () => {
                let characterSet: CharacterSet = set;

                let result = AnyRandom.char(characterSet);

                expect(result).not.toBeFalsy();
                expect(typeof result === "string").toBe(true);
                expect(result.length).toEqual(1);
                expect(characterSet.includes(result)).toBe(true);
            });
        });
    });

    describe("charArray", () => {
        it(`charArray - given no inputs, returns an array of characters, between 0 and 32 characters long, taken from the ATOM CharacterSet`, () => {
            let result = AnyRandom.charArray();

            expect(result).not.toBeFalsy();
            expect(result instanceof Array).toBe(true);
            expect(result.length).toBeGreaterThanOrEqual(0);
            expect(result.length).toBeLessThanOrEqual(32);

            let goodChars = result.filter((it) => CharacterSet.ATOM.includes(it));
            expect(goodChars.length).toEqual(result.length);
        });

        it(`charArray - given a range of lengths, returns an array of characters, some length in the given range, taken from the ATOM CharacterSet`, () => {
            let minLength = Math.floor(Math.random() * 32);
            let maxLength = minLength + Math.floor(Math.random() * 32);

            let result = AnyRandom.charArray(minLength, maxLength);

            expect(result).not.toBeFalsy();
            expect(result instanceof Array).toBe(true);
            expect(result.length).toBeGreaterThanOrEqual(minLength);
            expect(result.length).toBeLessThanOrEqual(maxLength);

            let goodChars = result.filter((it) => CharacterSet.ATOM.includes(it));
            expect(goodChars.length).toEqual(result.length);
        });

        it(`charArray - given a range of lengths, and a string of characters, returns an array of characters, some length in the given range, taken from the given string`, () => {
            let characterSet = "Mexico!";
            let minLength = Math.floor(Math.random() * 32);
            let maxLength = minLength + Math.floor(Math.random() * 32);

            let result = AnyRandom.charArray(minLength, maxLength, characterSet);

            expect(result).not.toBeFalsy();
            expect(result instanceof Array).toBe(true);
            expect(result.length).toBeGreaterThanOrEqual(minLength);
            expect(result.length).toBeLessThanOrEqual(maxLength);

            let goodChars = result.filter((it) => characterSet.includes(it));
            expect(goodChars.length).toEqual(result.length);
        });

        [
            { key: "ALPHA", set: CharacterSet.ALPHA },
            { key: "ALPHANUMERIC", set: CharacterSet.ALPHANUMERIC },
            { key: "ATOM", set: CharacterSet.ATOM },
            { key: "NUMERIC", set: CharacterSet.NUMERIC },
            { key: "SYMBOLS", set: CharacterSet.SYMBOLS }
        ].forEach(({ key, set }) => {
            it(`charArray - given a range of lengths, and the CharacterSet ${key}, returns an array of characters, some length in the given range, taken from the given CharacterSet`, () => {
                let characterSet = set;
                let minLength = Math.floor(Math.random() * 32);
                let maxLength = minLength + Math.floor(Math.random() * 32);

                let result = AnyRandom.charArray(minLength, maxLength, characterSet);

                expect(result).not.toBeFalsy();
                expect(result instanceof Array).toBe(true);
                expect(result.length).toBeGreaterThanOrEqual(minLength);
                expect(result.length).toBeLessThanOrEqual(maxLength);

                let goodChars = result.filter((it) => characterSet.includes(it));
                expect(goodChars.length).toEqual(result.length);
            });
        });
    });

    describe("string", () => {
        it(`string - given no inputs, returns a string, between 0 and 32 characters long, taken from the ATOM CharacterSet`, () => {
            let result = AnyRandom.string();

            expect(result == null).toBeFalsy();
            expect(typeof result === "string").toBe(true);
            expect(result.length).toBeGreaterThanOrEqual(0);
            expect(result.length).toBeLessThanOrEqual(32);
            for (var i = 0; i < result.length; i++) {
                expect(CharacterSet.ATOM.includes(result[i]));
            }
        });

        it(`string - given a range of lengths, returns a string, some length in the given range, taken from the ATOM CharacterSet`, () => {
            let minLength = Math.floor(Math.random() * 32);
            let maxLength = minLength + Math.floor(Math.random() * 32);

            let result = AnyRandom.string(minLength, maxLength);

            expect(result == null).toBeFalsy();
            expect(typeof result === "string").toBe(true);
            expect(result.length).toBeGreaterThanOrEqual(minLength);
            expect(result.length).toBeLessThanOrEqual(maxLength);
            for (var i = 0; i < result.length; i++) {
                expect(CharacterSet.ATOM.includes(result[i]));
            }
        });

        it(`string - given a range of lengths, and a string of characters, returns a string, some length in the given range, taken from the given string`, () => {
            let characterSet = "Mexico!";
            let minLength = Math.floor(Math.random() * 32);
            let maxLength = minLength + Math.floor(Math.random() * 32);

            let result = AnyRandom.string(minLength, maxLength, characterSet);

            expect(result == null).toBeFalsy();
            expect(typeof result === "string").toBe(true);
            expect(result.length).toBeGreaterThanOrEqual(minLength);
            expect(result.length).toBeLessThanOrEqual(maxLength);
            for (var i = 0; i < result.length; i++) {
                expect(characterSet.includes(result[i]));
            }
        });

        [
            { key: "ALPHA", set: CharacterSet.ALPHA },
            { key: "ALPHANUMERIC", set: CharacterSet.ALPHANUMERIC },
            { key: "ATOM", set: CharacterSet.ATOM },
            { key: "NUMERIC", set: CharacterSet.NUMERIC },
            { key: "SYMBOLS", set: CharacterSet.SYMBOLS }
        ].forEach(({ key, set }) => {
            it(`string - given a range of lengths, and the CharacterSet ${key}, returns a string, some length in the given range, taken from the given CharacterSet`, () => {
                let characterSet = set;
                let minLength = Math.floor(Math.random() * 32);
                let maxLength = minLength + Math.floor(Math.random() * 32);

                let result = AnyRandom.string(minLength, maxLength, characterSet);

                expect(result == null).toBeFalsy();
                expect(typeof result === "string").toBe(true);
                expect(result.length).toBeGreaterThanOrEqual(minLength);
                expect(result.length).toBeLessThanOrEqual(maxLength);
                for (var i = 0; i < result.length; i++) {
                    expect(characterSet.includes(result[i]));
                }
            });
        });
    });
});
