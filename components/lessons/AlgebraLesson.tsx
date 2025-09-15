"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/app-provider";
import { genLinearEquation, Equation } from "@/lib/math";
import { X } from "lucide-react";
import { InteractiveAlgebra } from "../interactive/InteractiveAlgebra";

/**
 * Componente principal para a lição de Álgebra.
 * Apresenta um layout de duas colunas com exercícios de prática à esquerda
 * e um painel interativo para gerar e resolver equações à direita.
 */
export function AlgebraLesson() {
  const { dispatch } = useAppContext();

  const handleExitPractice = () => {
    dispatch({ type: "SET_PRACTICING", payload: false });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Coluna de Prática */}
      <Card className="relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-3 right-3"
          onClick={handleExitPractice}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Sair do modo de prática</span>
        </Button>
        <CardHeader>
          <CardTitle>Prática: Equações Lineares</CardTitle>
          <CardDescription>Resolva as equações para ganhar XP.</CardDescription>
        </CardHeader>
        <CardContent>
          <AlgebraPractice />
        </CardContent>
      </Card>

      {/* Coluna Interativa */}
      <InteractiveAlgebra />
    </div>
  );
}

// Sub-componente interno para os exercícios de prática
function AlgebraPractice() {
    const { dispatch } = useAppContext();
    const [equation, setEquation] = React.useState<Equation>(genLinearEquation());
    const [answer, setAnswer] = React.useState("");
    const [feedback, setFeedback] = React.useState<React.ReactNode | null>(null);

    const generateNewProblem = () => {
        setEquation(genLinearEquation());
        setAnswer("");
        setFeedback(null);
    }

    const checkAnswer = () => {
        const isCorrect = parseInt(answer) === equation.x;
        if (isCorrect) {
            setFeedback(<p className="text-green-600 font-semibold">Correto! +10 XP</p>);
            dispatch({ type: 'ADD_XP', payload: { amount: 10, reason: 'Prática de Álgebra' } });
            setTimeout(generateNewProblem, 1500);
        } else {
            setFeedback(<p className="text-red-600 font-semibold">Incorreto. A resposta é {equation.x}. Tente a próxima!</p>);
            setTimeout(generateNewProblem, 2000);
        }
    };

    return (
        <div className="space-y-4 flex flex-col items-center">
            <p className="text-xl font-mono text-center p-4 bg-muted rounded-md w-full">
                {equation.text}
            </p>
            <div className="flex w-full items-center space-x-2">
                <Input
                    type="number"
                    placeholder="Sua resposta para x"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                    autoFocus
                />
                <Button onClick={checkAnswer}>Verificar</Button>
            </div>
            <div className="text-center min-h-[24px] font-medium">
                 {feedback}
            </div>
        </div>
    )
}

