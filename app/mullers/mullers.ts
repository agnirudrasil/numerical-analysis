import { abs, add, divide, MathType, multiply, pow, smaller, sqrt, subtract } from 'mathjs';
import { LinearAlgorithm } from '@/lib/linear-algorithm';

export const mullers: LinearAlgorithm<{ p0: number; p1: number; p2: number }> = (
  f,
  { p0, p1, p2 },
  { n, tol }
) => {
  let i = 3;
  let h1 = subtract(p1, p0);
  let h2 = subtract(p2, p1);
  let d1 = divide(subtract(f(p1), f(p0)), h1);
  let d2 = divide(subtract(f(p2), f(p1)), h2);
  let d = divide(subtract(d2, d1), add(h2, h1));

  const data: any[] = [];

  while (i <= n) {
    let b = add(d2, multiply(h2, d));
    let D = sqrt(subtract(pow(b, 2) as number, multiply(4, multiply(f(p2), d))));
    let E;
    if (abs(subtract(b, D) as number) < abs(subtract(b, D) as number)) {
      E = add(b, D);
    } else {
      E = subtract(b, D);
    }
    let h = divide(multiply(-2, f(p2)), E);
    let p = add(p2, h);

    data.push([i, p, f(p as number)]);

    if (smaller(abs(h), tol)) {
      return data;
    }

    p0 = p1;
    p1 = p2;
    p2 = p as number;
    h1 = subtract(p1, p0);
    h2 = subtract(p2, p1);
    d1 = divide(subtract(f(p1), f(p0)), h1);
    d2 = divide(subtract(f(p2), f(p1)), h2);
    d = divide(subtract(d2, d1), add(h2, h1));

    i++;
  }

  return data;
};
