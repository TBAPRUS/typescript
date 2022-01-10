import { ParseStringNumber } from "./CNumber";

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

type StringArrayToCNumberArray<
  Array extends string[],
  Result extends CNumber[] = []
> = Array extends [infer Head, ...infer Rest]
  ? StringArrayToCNumberArray<
      Rest extends string[] ? Rest : never,
      [...Result, ParseStringNumber<Head extends string ? Head : never>]
    >
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
  Result extends number[][] = []
> = MatrixColumns extends [infer Row, ...infer Rest]
  ? ParseMatrixColumns<
      Rest extends string[] ? Rest : never,
      [
        ...Result,
        StringArrayToCNumberArray<
          SplitBySpaceWithTrim<Row extends string ? Row : never>
        >
      ]
    >
  : Result;

type GetRowsCount<Rows extends any[]> = Rows["length"];

type GetColumsCount<
  Colums extends any[][],
  Result extends number = -1
> = Colums extends [infer Head, ...infer Rest]
  ? Head extends any[]
    ? Result extends Head["length"]
      ? GetColumsCount<Rest extends any[][] ? Rest : never, Result>
      : Result extends -1
      ? GetColumsCount<Rest extends any[][] ? Rest : never, Head["length"]>
      : never
    : never
  : Result;

type ParseStringMatrix<StringMatrix extends string> =
  ParseMatrixRows<StringMatrix> extends infer Rows
    ? Rows extends string[]
      ? ParseMatrixColumns<Rows> extends infer Columns
        ? GetColumsCount<
            Columns extends any[][] ? Columns : never
          > extends infer ColumnsCount
          ? ColumnsCount extends number
            ? Matrix<
                Columns extends any[][] ? Columns : never,
                GetRowsCount<Rows>,
                ColumnsCount
              >
            : never
          : never
        : never
      : never
    : never;

type Matrix<Matrix extends any[][], M, N> = {
  matrix: Matrix;
  m: M;
  n: N;
};

// type ParseCNumber

const a: ParseStringMatrix<`
  -11 42
  1  53
  0  531
`>;
