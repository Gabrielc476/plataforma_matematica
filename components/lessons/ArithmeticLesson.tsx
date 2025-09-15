"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/app-provider";
import { randInt, solveArithmetic } from "@/lib/math";
import { ArrowLeft, Lightbulb, RefreshCw } from "lucide-react";

// Componente genérico para exibir a solução (pode ser movido para um ficheiro partilhado se necessário)
const Solution = ({ solution, title }: { solution: string[], title: string }) => {
    const [show, setShow] = React.useState(false);
    if (!solution.length) return null;
    return (
        <div className="mt-4">
            <Button variant="ghost" size="sm" onClick={() => setShow(p => !p)}>
                <Lightbulb className="mr-2 h-4 w-4" />
                {show ? "Ocultar Solução" : "Mostrar Solução"}
            </Button>
            {show && (
                <Card className="mt-2 bg-muted/50">
                    <CardHeader className="p-4">
                        <CardTitle className="text-sm">{title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 text-sm font-mono space-y-1">
                        {solution.map((step, index) => <p key={index}>{step}</p>)}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};


/**
 * Componente de prática para a lição de Aritmética.
 * Gera problemas simples de adição e subtração e verifica a resposta do utilizador.
 */
export function ArithmeticLesson() {
  const { dispatch } = useAppContext();
  const [problem, setProblem] = React.useState({ a: 0, b: 0, operator: '+' as '+' | '-', answer: 0 });
  const [userAnswer, setUserAnswer] = React.useState("");
  const [feedback, setFeedback] = React.useState<React.ReactNode | null>(null);
  const [solution, setSolution] = React.useState<string[]>([]);

  const generateProblem = React.useCallback(() => {
    const a = randInt(10, 100);
    const b = randInt(10, 100);
    const operator = Math.random() > 0.5 ? '+' : '-';
    const answer = operator === '+' ? a + b : a - b;
    setProblem({ a, b, operator, answer });
    setUserAnswer("");
    setFeedback(null);
    setSolution([]);
  }, []);

  React.useEffect(() => {
    generateProblem();
  }, [generateProblem]);

  const checkAnswer = () => {
    const isCorrect = parseInt(userAnswer) === problem.answer;
    if (isCorrect) {
      setFeedback(<p className="text-green-600 font-bold mt-2">Correto! +5 XP</p>);
      dispatch({ type: 'ADD_XP', payload: { amount: 5, reason: 'Prática de Aritmética' } });
      setTimeout(generateProblem, 1500);
    } else {
      setFeedback(<p className="text-red-600 font-bold mt-2">Incorreto. Tente novamente.</p>);
    }
    setSolution(solveArithmetic(problem.a, problem.b, problem.operator));
  };

  return (
    <div>
      <CardHeader>
        <CardTitle>Prática de Aritmética</CardTitle>
        <CardDescription>Resolva as operações básicas.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center bg-muted/50 p-8 rounded-lg">
          <p className="text-3xl font-mono tracking-wider">
            {problem.a} {problem.operator} {problem.b} = ?
          </p>
        </div>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="A sua resposta"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
          />
          <Button onClick={checkAnswer}>Verificar</Button>
        </div>
        <div className="text-center min-h-[24px]">{feedback}</div>
        <Solution solution={solution} title="Solução" />
      </CardContent>
      <CardFooter className="flex justify-between">
         <Button variant="ghost" onClick={() => dispatch({ type: 'SET_PRACTICING', payload: false })}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar à Lição
        </Button>
        <Button variant="outline" size="icon" onClick={generateProblem}>
            <RefreshCw className="h-4 w-4" />
        </Button>
      </CardFooter>
    </div>
  );
}

