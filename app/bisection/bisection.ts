import { LinearAlgorithm } from '@/lib/linear-algorithm';

export const bisection: LinearAlgorithm<{ a: number; b: number }> = (f, { a, b }, { n, tol }) => {
  let fa = f(a);
  const data = [];

  for (let i = 0; i < n; i++) {
    const p = a + (b - a) / 2;
    const fp = f(p);
    data.push([i + 1, a, b, p, fp]);
    if (fp === 0 || (b - a) / 2 < tol) {
      return data;
    }

    if (fa * fp > 0) {
      a = p;
      fa = fp;
    } else {
      b = p;
    }
  }

  return data;
};
