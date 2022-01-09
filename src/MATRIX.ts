type TrimString<String extends string> = String extends `\n${infer Rest}`
  ? TrimString<Rest>
  : String extends `${infer Rest}\n`
  ? TrimString<Rest>
  : String extends ` ${infer Rest}`
  ? TrimString<Rest>
  : String extends `${infer Rest} `
  ? TrimString<Rest>
  : String;

type SplitBySpaceWithTrim<
  String extends string,
  Result extends string[] = []
> = String extends `${infer Head} ${infer Rest}`
  ? SplitBySpaceWithTrim<TrimString<Rest>, [...Result, TrimString<Head>]>
  : String extends `${infer Value}`
  ? [...Result, TrimString<Value>]
  : Result;

type ParseMatrixRows<
  Matrix extends string,
  Result extends string[] = []
> = Matrix extends `${infer Row}\n${infer Rest}`
  ? ParseMatrixRows<
      Rest,
      TrimString<Row> extends "" ? Result : [...Result, TrimString<Row>]
    >
  : Result;

type ParseMatrixColumns<
  MatrixColumns extends string[],
  Result extends string[][] = []
> = MatrixColumns extends [infer Row, ...infer Rest]
  ? ParseMatrixColumns<
      Rest extends string[] ? Rest : never,
      [...Result, SplitBySpaceWithTrim<Row extends string ? Row : never>]
    >
  : Result;

type ParseStringMatrix<Str extends string> =
  Str extends `${infer Head}\n${infer Till}` ? [Head, Till] : never;

const a: ParseMatrixColumns<
  ParseMatrixRows<`
  11 42 
  1  53
  0  531
`>
> = [
  ["11", "42"],
  ["1", "53"],
  ["0", "531"],
];
