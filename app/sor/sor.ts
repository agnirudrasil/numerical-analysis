import { MatrixAlgorithm } from '@/lib/matrix-algorithm';

export const successiveOverRelaxation: MatrixAlgorithm<{ w: number }> = (
  { A, b, x0, w },
  { tol, n }
) => {
  let k = 1;

  const data = [];

  while (k <= n) {
    const x = Array.from({ length: A.length }, () => [0]);
    const dataRow = [k];
    for (let i = 0; i < A.length; i += 1) {
      x[i][0] =
        (1 - w) * x0[i][0] +
        (w / A[i][i]) *
          (b[i][0] +
            -A[i].reduce(
              (acc, curr, index) =>
                index !== i
                  ? index > i
                    ? acc + curr * x0[index][0]
                    : acc + curr * x[index][0]
                  : acc,
              0
            ));
      dataRow.push(x[i][0]);
    }

    data.push(dataRow);

    if (x.map((row, i) => Math.abs(row[0] - x0[i][0]) < tol).every((v) => v)) {
      return data;
    }
    x0 = JSON.parse(JSON.stringify(x));
    k += 1;
  }

  return data;
};
