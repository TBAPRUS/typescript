type HEXDigit =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F";

type StringFromArray<
  Array extends (number | string)[] = [],
  Result extends string = ""
> = Array extends [infer Char, ...infer Rest]
  ? StringFromArray<
      Rest extends (number | string)[] ? Rest : [],
      `${Result}${Char extends number | string ? Char : ""}`
    >
  : Result;

// Size extends 6 don't work because type too complex
type HEX<
  Size extends 3 | 6,
  Result extends HEXDigit[] = []
> = Result["length"] extends Size
  ? `#${StringFromArray<Result>}`
  : HEX<Size, [...Result, HEXDigit]>;

// type HEX =
//   | `#${HEXDigit}${HEXDigit}${HEXDigit}`
//   | `#${HEXDigit}${HEXDigit}${HEXDigit}${HEXDigit}${HEXDigit}${HEXDigit}`;

const hex: HEX<3> = "#FFF";
