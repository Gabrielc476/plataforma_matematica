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

/**
 * Gera os passos para resolver uma equação linear.
 * @param eq O objeto da equação a ser resolvida.
 * @returns Um array de strings, cada uma representando um passo da solução.
 */
export function solveLinearEquation(eq: Equation): string[] {
  const steps: string[] = [];
  const { a, b, c, x } = eq;

  steps.push(`Equação: ${eq.text}`);

  if (b !== 0) {
    const cMinusB = c - b;
    steps.push(`1. Mova a constante para o outro lado:`);
    steps.push(`${a}x = ${c} ${b > 0 ? '-' : '+'} ${Math.abs(b)}`);
    steps.push(`${a}x = ${cMinusB}`);
  }

  if (a !== 1) {
    steps.push(`2. Isole o 'x' dividindo por ${a}:`);
    steps.push(`x = ${c - b} / ${a}`);
  }

  steps.push(`Resultado: x = ${x}`);
  return steps;
}

/**
 * Calcula a derivada de um polinómio simples.
 * @param input A expressão do polinómio como string (ex: "3x^2 - 2x + 5").
 * @returns A derivada como string.
 */
export function derivePolynomial(input: string): string {
  if (!input || !input.trim()) return '0';
  
  // Limpa a string e normaliza os sinais
  const cleaned = input.replace(/\s+/g, '').replace(/-/g, '+-');
  const tokens = cleaned.split('+').filter(Boolean);

  // Mapeia cada termo para um objeto { coeficiente, potência }
  const terms = tokens.map(t => {
    if (t.includes('x')) {
      const parts = t.split('x');
      let coef = parts[0];
      if (coef === '' || coef === '+') coef = '1';
      if (coef === '-') coef = '-1';
      
      let pow = 1;
      if (parts[1] && parts[1].startsWith('^')) {
        pow = parseInt(parts[1].slice(1), 10);
      }
      return { coef: parseFloat(coef), pow };
    } else {
      return { coef: parseFloat(t), pow: 0 };
    }
  });

  // Calcula a derivada de cada termo
  const derived = terms.map(term => {
    if (term.pow === 0) return null; // A derivada de uma constante é 0
    
    const newCoeff = term.coef * term.pow;
    const newPow = term.pow - 1;

    if (newPow === 0) return `${newCoeff}`;
    if (newPow === 1) return `${newCoeff}x`;
    return `${newCoeff}x^${newPow}`;
  }).filter(Boolean); // Remove os termos nulos

  if (derived.length === 0) return '0';
  
  // Junta os termos e formata a string de saída
  return derived.join(' + ').replace(/\+ -/g, '- ');
}

