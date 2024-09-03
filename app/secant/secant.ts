import { LinearAlgorithm } from '@/lib/linear-algorithm';

export const secant: LinearAlgorithm<{ p0: number; p1: number }> = (f, { p0, p1 }, { n, tol }) => {
  let i = 2;
  let q0 = f(p0);
  let q1 = f(p1);
  const data = [
    [0, p0],
    [1, p1],
  ];
  while (i <= n) {
    const p = p1 - (q1 * (p1 - p0)) / (q1 - q0);
    data.push([i, p]);
    if (Math.abs(p - p1) < tol) {
      return data;
    }
    p0 = p1;
    q0 = q1;
    p1 = p;
    q1 = f(p);

    i++;
  }
  return data;
};
