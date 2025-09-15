"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/app-provider";
import { randInt } from "@/lib/math";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { InteractiveGeometry } from "../interactive/InteractiveGeometry";

/**
 * Componente de prática para a lição de Geometria.
 * Gera problemas de cálculo de área de retângulos e integra o painel interativo.
 */
export function GeometryLesson() {
  const { dispatch } = useAppContext();
  const [problem, setProblem] = React.useState({ base: 0, height: 0, answer: 0 });
  const [userAnswer, setUserAnswer] = React.useState("");
  const [feedback, setFeedback] = React.useState<React.ReactNode | null>(null);

  const generateProblem = React.useCallback(() => {
    const base = randInt(5, 20);
    const height = randInt(5, 20);
    setProblem({ base, height, answer: base * height });
    setUserAnswer("");
    setFeedback(null);
  }, []);

  React.useEffect(() => {
    generateProblem();
  }, [generateProblem]);

  const checkAnswer = () => {
    const isCorrect = parseInt(userAnswer) === problem.answer;
    if (isCorrect) {
      setFeedback(<p className="text-green-600 font-bold mt-2">Correto! +10 XP</p>);
      dispatch({ type: 'ADD_XP', payload: { amount: 10, reason: 'Prática de Geometria' } });
       setTimeout(generateProblem, 1500);
    } else {
      setFeedback(<p className="text-red-600 font-bold mt-2">Incorreto. A área é base x altura.</p>);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* Coluna da Esquerda: Exercício */}
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle>Prática: Área do Retângulo</CardTitle>
          <CardDescription>Calcule a área com os valores dados.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-6">
           <div className="text-center bg-muted/50 p-4 rounded-lg">
             <p className="text-lg">
                Qual é a área de um retângulo com base <strong>{problem.base}</strong> e altura <strong>{problem.height}</strong>?
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
          {feedback && <div className="text-center">{feedback}</div>}
        </CardContent>
         <CardFooter className="flex justify-between">
             <Button variant="ghost" onClick={() => dispatch({ type: 'SET_PRACTICING', payload: false })}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
            </Button>
            <Button variant="outline" size="icon" onClick={generateProblem}>
                <RefreshCw className="h-4 w-4" />
            </Button>
        </CardFooter>
      </Card>
      
      {/* Coluna da Direita: Painel Interativo */}
      <InteractiveGeometry />
    </div>
  );
}

