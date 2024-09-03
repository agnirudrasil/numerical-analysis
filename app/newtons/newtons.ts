import { LinearAlgorithm } from '@/lib/linear-algorithm';

export const newtons: LinearAlgorithm<{ p0: number; fprime: (x: number) => number }> = (
  f,
  { p0, fprime },
  { n, tol }
) => {
  let i = 1;

  const data = [];

  while (i <= n) {
    let p = p0 - f(p0) / fprime(p0);
    data.push([i, p]);
    if (Math.abs(p - p0) < tol) {
      return data;
    }
    i++;
    p0 = p;
  }

  return data;
};
