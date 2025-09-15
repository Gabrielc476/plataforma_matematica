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
 * Define a estrutura de uma equação quadrática.
 */
export type QuadraticEquation = {
    a: number;
    b: number;
    c: number;
    roots: number[];
    text: string;
}

/**
 * Gera um número inteiro aleatório dentro de um intervalo.
 */
export function randInt(a: number, b: number): number {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

/**
 * Cria uma equação linear simples com uma solução inteira.
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
 */
export function solveLinearEquation(eq: Equation): string[] {
  const steps: string[] = [];
  const { a, b, c, x } = eq;
  steps.push(`Equação: ${eq.text}`);
  if (b !== 0) {
    const cMinusB = c - b;
    steps.push(`1. Mova a constante: ${a}x = ${c} ${b > 0 ? '-' : '+'} ${Math.abs(b)}`);
    steps.push(`   ${a}x = ${cMinusB}`);
  }
  if (a !== 1) {
    steps.push(`2. Isole 'x': x = ${c - b} / ${a}`);
  }
  steps.push(`Resultado: x = ${x}`);
  return steps;
}

/**
 * Cria uma equação quadrática com soluções inteiras.
 */
export function genQuadraticEquation(): QuadraticEquation {
    const a = randInt(1, 3);
    const r1 = randInt(-5, 5);
    let r2 = randInt(-5, 5);
    // Garante que as raízes sejam diferentes na maioria das vezes para problemas mais interessantes
    if (r1 === r2 && Math.random() < 0.8) {
        r2 = r1 + randInt(1, 3);
    }
    
    const b = -a * (r1 + r2);
    const c = a * r1 * r2;

    const formatTerm = (coeff: number, power: string) => {
        if (coeff === 0) return "";
        const sign = coeff > 0 ? '+' : '-';
        const absCoeff = Math.abs(coeff);
        const displayCoeff = absCoeff === 1 && power !== '' ? '' : absCoeff;
        return ` ${sign} ${displayCoeff}${power}`;
    };

    let text = `${a === 1 ? '' : a}x²${formatTerm(b, 'x')}${formatTerm(c, '')} = 0`;
    text = text.trim().startsWith('+') ? text.trim().substring(2) : text.trim();

    return { a, b, c, roots: [r1, r2].sort((n1, n2) => n1 - n2), text };
}

/**
 * Gera os passos para resolver uma equação quadrática usando a fórmula de Bhaskara.
 */
export function solveQuadraticEquation(eq: QuadraticEquation): string[] {
    const { a, b, c, roots } = eq;
    const steps: string[] = [];
    steps.push(`Equação: ${eq.text}`);
    steps.push(`1. Identifique os coeficientes: a=${a}, b=${b}, c=${c}`);
    const delta = b * b - 4 * a * c;
    steps.push(`2. Calcule o delta: Δ = b² - 4ac`);
    steps.push(`   Δ = (${b})² - 4 * ${a} * ${c} = ${delta}`);
    steps.push(`3. Aplique a fórmula: x = (-b ± √Δ) / 2a`);
    const sqrtDelta = Math.sqrt(delta);
    steps.push(`   x = (-(${b}) ± √${delta}) / (2 * ${a})`);
    steps.push(`   x = (${-b} ± ${sqrtDelta}) / ${2 * a}`);
    if (roots.length > 1) {
        steps.push(`x' = (${-b} + ${sqrtDelta}) / ${2 * a} = ${roots[1]}`);
        steps.push(`x'' = (${-b} - ${sqrtDelta}) / ${2 * a} = ${roots[0]}`);
        steps.push(`Resultado: {${roots[0]}, ${roots[1]}}`);
    } else {
        steps.push(`x = ${-b} / ${2 * a} = ${roots[0]}`);
        steps.push(`Resultado: {${roots[0]}}`);
    }
    return steps;
}

/**
 * Gera um problema de área de círculo.
 */
export function genCircleProblem(): { radius: number, area: number } {
    const radius = randInt(2, 15);
    const area = Math.PI * radius * radius;
    return { radius, area };
}

/**
 * Gera os passos para resolver um problema de área de círculo.
 */
export function solveCircleArea(radius: number): string[] {
    const area = Math.PI * radius * radius;
    return [
        `Fórmula: A = π * r²`,
        `1. Substitua o raio (r): A = π * ${radius}²`,
        `2. Calcule o resultado: A ≈ ${area.toFixed(2)}`
    ];
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


// Funções de solução para os outros tópicos do Quick Generator
export const solveArithmetic = (a: number, b: number, op: '+' | '-') => [`${a} ${op} ${b} = ${op === '+' ? a + b : a - b}`];
export const solveGeometry = (base: number, height: number) => [`Área = base * altura`, `Área = ${base} * ${height} = ${base * height}`];
export const solveCalculus = (expression: string) => [`d/dx (${expression}) = ${derivePolynomial(expression)}`];

