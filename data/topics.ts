// 1. Definindo os Tipos para garantir a consistência dos dados

// As chaves dos tópicos. Isso garante que só podemos usar os nomes definidos.
export type TopicKey = 'arithmetic' | 'algebra' | 'geometry' | 'calculus' | 'logic';

// A estrutura de um único tópico
export type Topic = {
  title: string;
  lessons: {
    title: string;
    content: string;
  }[];
};

// A estrutura do objeto principal que conterá todos os tópicos
export type Topics = {
  [key in TopicKey]: Topic;
};


// 2. Os dados da aplicação
// -----------------------------------------------------------------------------

export const topics: Topics = {
  arithmetic: {
    title: 'Aritmética',
    lessons: [
      {
        title:'Operações Básicas', 
        content:'Aprenda e pratique adição, subtração, multiplicação e divisão. Use o gerador rápido para desafios infinitos.'
      },
      {
        title:'Frações e Porcentagens', 
        content:'Entenda como converter frações, somar, multiplicar e calcular porcentagens de valores.'
      }
    ]
  },
  algebra: {
    title:'Álgebra',
    lessons:[
      {
        title:'Equações Lineares', 
        content:'Resolva equações do tipo ax + b = c. Use o painel interativo para gerar equações e ver a solução passo a passo.'
      },
      {
        title:'Equações Quadráticas', 
        content:'Aprenda a resolver equações de segundo grau (ax² + bx + c = 0) utilizando a fórmula de Bhaskara.'
      }
    ]
  },
  geometry:{
    title:'Geometria',
    lessons:[
      {
        title:'Área de Retângulos',
        content:'Calcule a área de retângulos e quadrados. Experimente o painel interativo de geometria para uma experiência visual.'
      },
      {
        title:'Área do Círculo',
        content:'Aprenda a calcular a área de um círculo usando a fórmula A = π * r².'
      }
    ]
  },
  calculus:{
    title:'Cálculo',
    lessons:[
      {
        title:'Derivadas de Polinômios',
        content:'Aprenda as regras básicas de derivação para polinômios simples e veja o processo de solução.'
      }
    ]
  },
  logic:{
    title:'Raciocínio Lógico',
    lessons:[
      {
        title:'Tabelas Verdade',
        content:'Construa expressões lógicas usando AND (&&), OR (||) e Negação (!) e gere tabelas verdade para analisar os resultados.'
      }
    ]
  }
};

