import { MathType } from 'mathjs';

export type LinearAlgorithm<T> = (
  f: (x: number) => number,
  inputs: T,
  config: {
    tol: number;
    n: number;
  }
) => number[][];
