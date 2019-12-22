import { Double } from "../numbers/Double";

export class RandomDate {
  public static next(earliest?: Date, latest?: Date): Date {
    var date1 = earliest || new Date("01-01-1970");
    var date2 = latest || new Date(Date.now());

    if (date1 == date2) {
      return earliest;
    }

    let lhs = new Date(date1).getTime();
    let rhs = new Date(date1).getTime();

    let between = Double.next(lhs, rhs);

    return new Date(between);
  }
}
