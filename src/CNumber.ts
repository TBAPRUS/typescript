export type Nums = {
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

export type Plus = "+";
export type Minus = "-";
export type Sign = Plus | Minus;

export type CNumber<Number extends number, NumberSign extends Sign = Plus> = {
  number: Number;
  sign: NumberSign;
};

export type ParseStringNumberToNumber<StringNumber extends keyof Nums> =
  Nums[StringNumber];

export type ParseSignInStringNumber<Value extends string> =
  Value extends `-${infer Number}` ? [Number, Minus] : [Value, Plus];

export type ArrayWithLengthEqualToNum<
  Num extends number,
  Result extends 0[] = []
> = Num extends Result["length"]
  ? Result
  : ArrayWithLengthEqualToNum<Num, [...Result, 0]>;

export type MultiplyArrayLengthBy10<Array extends any[]> = [
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

export type _ParseStringNumber<
  Number extends string,
  Result extends any[] = []
> = Number extends `${infer Head}${infer Rest}`
  ? _ParseStringNumber<
      Rest,
      [
        ...MultiplyArrayLengthBy10<Result>,
        ...ArrayWithLengthEqualToNum<
          ParseStringNumberToNumber<
            Head extends keyof Nums ? Head : never
          > extends number
            ? ParseStringNumberToNumber<Head extends keyof Nums ? Head : never>
            : never
        >
      ]
    >
  : Result["length"];

export type ParseStringNumber<Number extends string> =
  ParseSignInStringNumber<Number> extends infer Data
    ? Data extends [string, Sign]
      ? CNumber<_ParseStringNumber<Data[0]>, Data[1]>
      : never
    : never;
