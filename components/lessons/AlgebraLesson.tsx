"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/app-provider";
import { genLinearEquation, Equation, solveLinearEquation, QuadraticEquation, genQuadraticEquation, solveQuadraticEquation } from "@/lib/math";
import { X } from "lucide-react";
import { InteractiveAlgebra } from "../interactive/InteractiveAlgebra";

export function AlgebraLesson() {
  const { state, dispatch } = useAppContext();
  const { currentLessonIndex } = state;

  const handleExitPractice = () => {
    dispatch({ type: "SET_PRACTICING", payload: false });
    dispatch({ type: "CLEAR_CONSOLE" });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
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
          <CardTitle>Prática: {currentLessonIndex === 0 ? "Equações Lineares" : "Equações Quadráticas"}</CardTitle>
          <CardDescription>Resolva as equações para ganhar XP.</CardDescription>
        </CardHeader>
        <CardContent>
          {currentLessonIndex === 0 ? <LinearEquationPractice /> : <QuadraticEquationPractice />}
        </CardContent>
      </Card>
      <InteractiveAlgebra />
    </div>
  );
}

// Sub-componente interno para os exercícios de prática
function LinearEquationPractice() {
    const { dispatch } = useAppContext();
    const [equation, setEquation] = React.useState<Equation>(genLinearEquation());
    const [answer, setAnswer] = React.useState("");
    const [feedback, setFeedback] = React.useState<React.ReactNode | null>(null);

    const generateNewProblem = React.useCallback(() => {
        setEquation(genLinearEquation());
        setAnswer("");
        setFeedback(null);
    }, []);

    const checkAnswer = () => {
        const isCorrect = parseInt(answer) === equation.x;
        if (isCorrect) {
            setFeedback(<p className="text-green-600 font-semibold">Correto! +10 XP</p>);
            dispatch({ type: 'ADD_XP', payload: { amount: 10, reason: 'Prática de Álgebra Linear' } });
            setTimeout(generateNewProblem, 1500);
        } else {
            setFeedback(<p className="text-red-600 font-semibold">Incorreto. Veja a solução no console.</p>);
        }
        dispatch({ type: "SET_CONSOLE_CONTENT", payload: { title: "Solução (Eq. Linear)", lines: solveLinearEquation(equation) }});
    };

    return (
        <div className="space-y-4 flex flex-col items-center">
            <p className="text-xl font-mono text-center p-4 bg-muted rounded-md w-full">
                {equation.text}
            </p>
            <div className="flex w-full items-center space-x-2">
                <Input type="number" placeholder="Sua resposta para x" value={answer} onChange={(e) => setAnswer(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && checkAnswer()} autoFocus />
                <Button onClick={checkAnswer}>Verificar</Button>
            </div>
            <div className="text-center min-h-[24px] font-medium">{feedback}</div>
        </div>
    )
}

// Sub-componente para equações quadráticas
function QuadraticEquationPractice() {
    const { dispatch } = useAppContext();
    const [equation, setEquation] = React.useState<QuadraticEquation>(genQuadraticEquation());
    const [answer, setAnswer] = React.useState("");
    const [feedback, setFeedback] = React.useState<React.ReactNode | null>(null);
    
    const generateNewProblem = React.useCallback(() => {
        setEquation(genQuadraticEquation());
        setAnswer("");
        setFeedback(null);
    }, []);

    const checkAnswer = () => {
        const userRoots = answer.split(',').map(n => parseInt(n.trim())).sort((a,b) => a-b);
        const correctRoots = equation.roots;
        const isCorrect = userRoots.length === correctRoots.length && userRoots.every((val, index) => val === correctRoots[index]);

        if (isCorrect) {
            setFeedback(<p className="text-green-600 font-semibold">Correto! +15 XP</p>);
            dispatch({ type: 'ADD_XP', payload: { amount: 15, reason: 'Prática de Álgebra Quadrática' } });
            setTimeout(generateNewProblem, 1500);
        } else {
            setFeedback(<p className="text-red-600 font-semibold">Incorreto. Veja a solução no console.</p>);
        }
        dispatch({ type: "SET_CONSOLE_CONTENT", payload: { title: "Solução (Bhaskara)", lines: solveQuadraticEquation(equation) }});
    };
    
    return (
        <div className="space-y-4 flex flex-col items-center">
            <p className="text-xl font-mono text-center p-4 bg-muted rounded-md w-full">
                {equation.text}
            </p>
            <div className="flex w-full items-center space-x-2">
                <Input placeholder="Raízes (ex: -2, 5)" value={answer} onChange={(e) => setAnswer(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && checkAnswer()} autoFocus />
                <Button onClick={checkAnswer}>Verificar</Button>
            </div>
            <div className="text-center min-h-[24px] font-medium">{feedback}</div>
        </div>
    )
}

