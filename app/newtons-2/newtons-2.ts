import { add, derivative, evaluate, inv, Matrix, matrix, multiply } from 'mathjs';
import { NonLinearAlgorithm } from '@/lib/non-linear-algorithm';

export const newtonsNonLinear: NonLinearAlgorithm = ({ F, x0 }, { tol, n }) => {
  let k = 1;

  const J = F.map((row) =>
    Array.from({ length: F.length }).map((_, i) => derivative(row[0], `x${i + 1}`))
  );

  let x: number[][] = JSON.parse(JSON.stringify(x0));

  const data = [[0, ...x.map((row) => row[0]), NaN]];

  while (k <= n) {
    const J_x = matrix(
      J.map((row) =>
        row.map((f) =>
          f.evaluate({
            ...x.reduce((acc, row, i) => ({ ...acc, [`x${i + 1}`]: row[0] }), {}),
          })
        )
      )
    );
    const F_x = matrix(
      F.map((row) =>
        row.map((f) =>
          evaluate(f as any, {
            ...x.reduce((acc, row, i) => ({ ...acc, [`x${i + 1}`]: row[0] }), {}),
          })
        )
      )
    );

    const y = multiply(-1, multiply(inv(J_x), F_x));

    x = (add(x, y) as Matrix).toArray() as any;

    data.push([
      k,
      ...x.map((row) => row[0]),
      Math.max(...(y.toArray() as number[][]).map((row) => row[0])),
    ]);

    if ((y.toArray() as number[][]).every((row) => (row[0] as any) < tol)) {
      break;
    }

    k += 1;
  }

  return { data, jacobian: J };
};
