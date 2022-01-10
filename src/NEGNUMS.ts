type Plus = "+";
type Minus = "-";
type Sign = Plus | Minus;

type CNumber = [Sign, number];

type NumberToCNumber<Number extends number, NumberSign extends Sign = Plus> = [
  NumberSign,
  Number
];

type NumberFromCNumber<Value extends CNumber> = Value[1];
type SignFromCNumber<Value extends CNumber> = Value[0];

type ArrayFromNumber<
  Number extends number,
  Counter extends any[] = []
> = Counter["length"] extends Number
  ? Counter
  : ArrayFromNumber<Number, [...Counter, 0]>;

type Inc<Value extends CNumber> = NumberFromCNumber<Value> extends 0
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

type Dec<Value extends CNumber> = NumberFromCNumber<Value> extends 0
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
