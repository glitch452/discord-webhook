type BuildTuple<Len extends number, T, R extends unknown[] = []> = R['length'] extends Len
  ? R
  : BuildTuple<Len, T, [...R, T]>;

// Inclusive union of integer literals from Min to Max
type NumericRange<
  Min extends number,
  Max extends number,
  Acc extends unknown[] = [],
  Out = never,
  Reached extends boolean = false,
> = Acc['length'] extends Max
  ? Reached extends true
    ? Out | Acc['length']
    : Acc['length'] extends Min
      ? Out | Acc['length']
      : Out
  : Acc['length'] extends Min
    ? NumericRange<Min, Max, [...Acc, unknown], Out | Acc['length'], true>
    : Reached extends true
      ? NumericRange<Min, Max, [...Acc, unknown], Out | Acc['length'], true>
      : NumericRange<Min, Max, [...Acc, unknown], Out, false>;

export type BuildTuples<Min extends number, Max extends number, T> =
  NumericRange<Min, Max> extends infer L ? (L extends number ? BuildTuple<L, T> : never) : never;
