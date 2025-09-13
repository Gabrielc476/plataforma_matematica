/**
 * Define a estrutura de uma equação linear para ser usada na aplicação.
 */
export type Equation = {
  a: number;
  b: number;
  c: number;
  x: number;
  text: string;
};

/**
 * Gera um número inteiro aleatório dentro de um intervalo.
 * @param a O limite inferior (inclusivo).
 * @param b O limite superior (inclusivo).
 * @returns Um número inteiro aleatório.
 */
export function randInt(a: number, b: number): number {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

/**
 * Cria uma equação linear simples com uma solução inteira.
 * @returns Um objeto Equation contendo os coeficientes e a solução.
 */
export function genLinearEquation(): Equation {
  const a = randInt(1, 10);
  const b = randInt(-10, 10);
  const x = randInt(-10, 10);
  const c = a * x + b;
  return { a, b, c, x, text: `${a}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} = ${c}` };
}
