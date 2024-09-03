export type MatrixAlgorithm<T = {}> = (
  inputs: T & {
    A: number[][];
    b: number[][];
    x0: number[][];
  },
  config: {
    tol: number;
    n: number;
  }
) => number[][];
