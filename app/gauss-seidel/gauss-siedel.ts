import { MatrixAlgorithm } from '@/lib/matrix-algorithm';

export const gaussSeidel: MatrixAlgorithm = ({ A, b, x0 }, { tol, n }) => {
  let k = 1;

  let data = [];

  while (k <= n) {
    let x = Array.from({ length: A.length }, () => [0]);
    let dataRow = [k];
    for (let i = 0; i < A.length; i++) {
      for (let j = 0; j < A[i].length; j++) {
        x[i][0] =
          (1 / A[i][i]) *
          (b[i][0] +
            -A[i].reduce(
              (acc, curr, index) =>
                index !== i
                  ? index < i
                    ? acc + curr * x[index][0]
                    : acc + curr * x0[index][0]
                  : acc,
              0
            ));
      }
      dataRow.push(x[i][0]);
    }

    data.push(dataRow);

    if (x.map((row, i) => Math.abs(row[0] - x0[i][0]) < tol).every((v) => v)) {
      return data;
    }
    x0 = JSON.parse(JSON.stringify(x));
    k++;
  }

  return data;
};
