import { Double } from "@testing/random/numbers/__public_api";

export class RandomDate {
    public static next(earliest: Date, latest: Date): Date {
        if (earliest == latest) {
            return earliest;
        }

        var timeRange = latest.getTime() - earliest.getTime();
        let newTime = earliest.getTime() + Double.next(0, timeRange);

        return new Date(newTime);
    }
}
