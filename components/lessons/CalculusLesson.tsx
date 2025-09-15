"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/app-provider";
import { randInt, derivePolynomial } from "@/lib/math";
import { ArrowLeft, RefreshCw } from "lucide-react";

/**
 * Componente de prática para a lição de Cálculo.
 * Gera problemas de derivadas de polinómios simples.
 */
export function CalculusLesson() {
  const { dispatch } = useAppContext();
  const [problem, setProblem] = React.useState({ expression: "", answer: "" });
  const [userAnswer, setUserAnswer] = React.useState("");
  const [feedback, setFeedback] = React.useState<React.ReactNode | null>(null);

  const generateProblem = React.useCallback(() => {
    const coeff = randInt(2, 9);
    const power = randInt(2, 5);
    const expression = `${coeff}x^${power}`;
    const answer = derivePolynomial(expression);
    setProblem({ expression, answer });
    setUserAnswer("");
    setFeedback(null);
  }, []);

  React.useEffect(() => {
    generateProblem();
  }, [generateProblem]);

  const checkAnswer = () => {
    // Normaliza a resposta para uma comparação mais flexível
    const normalizedUserAnswer = userAnswer.replace(/\s/g, "").toLowerCase();
    const normalizedCorrectAnswer = problem.answer.replace(/\s/g, "").toLowerCase();

    if (normalizedUserAnswer === normalizedCorrectAnswer) {
      setFeedback(<p className="text-green-600 font-bold mt-2">Correto! +15 XP</p>);
      dispatch({ type: 'ADD_XP', payload: { amount: 15, reason: 'Prática de Cálculo' } });
       setTimeout(generateProblem, 1500);
    } else {
      setFeedback(<p className="text-red-600 font-bold mt-2">Incorreto. A resposta é: {problem.answer}</p>);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prática de Cálculo</CardTitle>
        <CardDescription>Encontre a derivada da expressão seguinte.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center bg-muted/50 p-8 rounded-lg">
          <p className="text-3xl font-mono tracking-wider">
            d/dx ({problem.expression}) = ?
          </p>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="A sua resposta (ex: 12x^3)"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
          />
          <Button onClick={checkAnswer}>Verificar</Button>
        </div>
        {feedback && <div className="text-center">{feedback}</div>}
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
    </Card>
  );
}

