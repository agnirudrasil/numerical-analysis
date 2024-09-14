import { MathNode, MathType } from 'mathjs';

export type NonLinearAlgorithm<T = {}> = (
  inputs: T & {
    F: MathNode[][];
    x0: MathType[][];
  },
  config: {
    tol: number;
    n: number;
  }
) => { data: number[][]; jacobian: MathNode[][] };
