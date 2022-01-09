export type Plus = "+";
export type Minus = "-";
export type Sign = Plus | Minus;

export type CNumber = [Sign, number];

export type NumberToCNumber<
  Number extends number,
  NumberSign extends Sign = Plus
> = [NumberSign, Number];

export type NumberFromCNumber<Value extends CNumber> = Value[1];
export type SignFromCNumber<Value extends CNumber> = Value[0];

export type ArrayFromNumber<
  Number extends number,
  Counter extends any[] = []
> = Counter["length"] extends Number
  ? Counter
  : ArrayFromNumber<Number, [...Counter, 0]>;

export type Inc<Value extends CNumber> = NumberFromCNumber<Value> extends 0
  ? NumberToCNumber<1>
  : SignFromCNumber<Value> extends Plus
  ? NumberToCNumber<
      [...ArrayFromNumber<NumberFromCNumber<Value>>, 0]["length"] extends number
        ? [...ArrayFromNumber<NumberFromCNumber<Value>>, 0]["length"]
        : never
    >
  : NumberToCNumber<
      ArrayFromNumber<NumberFromCNumber<Value>> extends [
        infer _Head,
        ...infer Teil
      ]
        ? Teil["length"]
        : never,
      Minus
    >;

export type Dec<Value extends CNumber> = NumberFromCNumber<Value> extends 0
  ? NumberToCNumber<1, Minus>
  : SignFromCNumber<Value> extends Plus
  ? NumberToCNumber<
      ArrayFromNumber<NumberFromCNumber<Value>> extends [
        infer _Head,
        ...infer Teil
      ]
        ? Teil["length"]
        : never
    >
  : NumberToCNumber<
      [...ArrayFromNumber<NumberFromCNumber<Value>>, 0]["length"] extends number
        ? [...ArrayFromNumber<NumberFromCNumber<Value>>, 0]["length"]
        : never,
      Minus
    >;

const b: Dec<NumberToCNumber<5, Minus>> = ["-", 6];
