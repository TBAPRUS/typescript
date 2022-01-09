type StN = {
  "0": 0;
  "1": 1;
  "2": 2;
  "3": 3;
  "4": 4;
  "5": 5;
  "6": 6;
  "7": 7;
  "8": 8;
  "9": 9;
};

type NumberFromStringNumber<Number extends keyof StN> = StN[Number];

type ArrayWithLengthEqualToNumber<
  Number extends number,
  Result extends 0[] = []
> = Result["length"] extends Number
  ? Result
  : ArrayWithLengthEqualToNumber<Number, [...Result, 0]>;

type IncArrayByTen<Array extends any[]> = [
  ...Array,
  ...Array,
  ...Array,
  ...Array,
  ...Array,
  ...Array,
  ...Array,
  ...Array,
  ...Array,
  ...Array
];

type StringNumberToNumber<
  StringNumber extends string,
  Result extends any[] = []
> = StringNumber extends `${infer Number}${infer Rest}`
  ? StringNumberToNumber<
      Rest,
      [
        ...IncArrayByTen<Result>,
        ...ArrayWithLengthEqualToNumber<
          NumberFromStringNumber<
            Number extends keyof StN ? Number : "0"
          > extends number
            ? NumberFromStringNumber<Number extends keyof StN ? Number : "0">
            : 0
        >
      ]
    >
  : Result["length"];

type SUM<
  String extends string,
  Result extends number = 0
> = String extends `${infer Number}+${infer Rest}`
  ? SUM<
      Rest,
      [
        ...ArrayWithLengthEqualToNumber<Result>,
        ...ArrayWithLengthEqualToNumber<StringNumberToNumber<Number>>
      ]["length"] extends number
        ? [
            ...ArrayWithLengthEqualToNumber<Result>,
            ...ArrayWithLengthEqualToNumber<StringNumberToNumber<Number>>
          ]["length"]
        : 0
    >
  : String extends `${infer Number}`
  ? [
      ...ArrayWithLengthEqualToNumber<Result>,
      ...ArrayWithLengthEqualToNumber<StringNumberToNumber<Number>>
    ]["length"]
  : Result;

const b: SUM<"13+43+54">;
