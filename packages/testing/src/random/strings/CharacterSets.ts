export enum CharacterSet {
    /** Upper- and lower-case English letters. */
    ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",

    /** The numbers 0 through 9. */
    NUMERIC = "0123456789",

    /** Upper- and lower-case English letters, and the numbers 0 through 9. */
    ALPHANUMERIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",

    /**
     * The following characters:
     * ! # $ % & ' * + - / = ? ^ _ ` { | } ~
     */
    SYMBOLS = "!#$%&'*+-/=?^_`{|}~",

    /**
     * Concatenation of the `ALPHANUMERIC` and `SYMBOLS` character sets.
     */
    ATOM = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&'*+-/=?^_`{|}~"
}
