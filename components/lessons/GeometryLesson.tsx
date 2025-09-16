"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/app-provider";
import { randInt, solveGeometry, genCircleProblem, solveCircleArea } from "@/lib/math";
import { ArrowLeft, RefreshCw, X } from "lucide-react";
import { InteractiveGeometry } from "../interactive/InteractiveGeometry";

export function GeometryLesson() {
  const { state, dispatch } = useAppContext();
  const { currentLessonIndex } = state;

  const handleExitPractice = () => {
    dispatch({ type: "SET_PRACTICING", payload: false });
    dispatch({ type: "CLEAR_CONSOLE" });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card className="relative">
         <Button variant="ghost" size="icon" className="absolute top-3 right-3" onClick={handleExitPractice}>
            <X className="h-4 w-4" /><span className="sr-only">Sair</span>
        </Button>
        <CardHeader>
          <CardTitle>Prática: {currentLessonIndex === 0 ? "Área de Retângulos" : "Área do Círculo"}</CardTitle>
          <CardDescription>Calcule a área com os valores dados.</CardDescription>
        </CardHeader>
        {currentLessonIndex === 0 ? <RectangleAreaPractice /> : <CircleAreaPractice />}
      </Card>
      <InteractiveGeometry />
    </div>
  );
}

function RectangleAreaPractice() {
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

  React.useEffect(() => { generateProblem(); }, [generateProblem]);

  const checkAnswer = () => {
    const isCorrect = parseInt(userAnswer) === problem.answer;
    if (isCorrect) {
      setFeedback(<p className="text-green-600 font-bold">Correto! +10 XP</p>);
      dispatch({ type: 'ADD_XP', payload: { amount: 10, reason: 'Prática de Geometria' } });
      setTimeout(generateProblem, 1500);
    } else {
      setFeedback(<p className="text-red-600 font-bold">Incorreto.</p>);
    }
    dispatch({ type: 'SET_CONSOLE_CONTENT', payload: { title: "Solução (Área Retângulo)", lines: solveGeometry(problem.base, problem.height) } });
  };

  return (
      <>
        <CardContent className="flex-grow space-y-6">
            <div className="text-center bg-muted/50 p-4 rounded-lg">
                <p className="text-lg">Qual é a área de um retângulo com base <strong>{problem.base}</strong> e altura <strong>{problem.height}</strong>?</p>
            </div>
            <div className="flex gap-2">
                <Input type="number" placeholder="A sua resposta" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}/>
                <Button onClick={checkAnswer}>Verificar</Button>
            </div>
            <div className="text-center min-h-[24px]">{feedback}</div>
        </CardContent>
        <CardFooter className="flex justify-end pt-0">
            <Button variant="outline" size="icon" onClick={generateProblem}><RefreshCw className="h-4 w-4" /></Button>
        </CardFooter>
      </>
  );
}

function CircleAreaPractice() {
  const { dispatch } = useAppContext();
  const [problem, setProblem] = React.useState({ radius: 0, area: 0 });
  const [userAnswer, setUserAnswer] = React.useState("");
  const [feedback, setFeedback] = React.useState<React.ReactNode | null>(null);
  
  const generateProblem = React.useCallback(() => {
    setProblem(genCircleProblem());
    setUserAnswer("");
    setFeedback(null);
  }, []);

  React.useEffect(() => { generateProblem(); }, [generateProblem]);

  const checkAnswer = () => {
    const userNum = parseFloat(userAnswer);
    const isCorrect = Math.abs(userNum - problem.area) < 0.1;
    if (isCorrect) {
      setFeedback(<p className="text-green-600 font-bold">Correto! +12 XP</p>);
      dispatch({ type: 'ADD_XP', payload: { amount: 12, reason: 'Prática de Área do Círculo' } });
       setTimeout(generateProblem, 1500);
    } else {
      setFeedback(<p className="text-red-600 font-bold">Incorreto.</p>);
    }
    dispatch({ type: 'SET_CONSOLE_CONTENT', payload: { title: "Solução (Área Círculo)", lines: solveCircleArea(problem.radius) } });
  };

  return (
      <>
        <CardContent className="flex-grow space-y-6">
            <div className="text-center bg-muted/50 p-4 rounded-lg">
                <p className="text-lg">Qual é a área de um círculo com raio <strong>{problem.radius}</strong>? (Use π ≈ 3.14)</p>
            </div>
            <div className="flex gap-2">
                <Input type="number" placeholder="A sua resposta" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}/>
                <Button onClick={checkAnswer}>Verificar</Button>
            </div>
            <div className="text-center min-h-[24px]">{feedback}</div>
        </CardContent>
        <CardFooter className="flex justify-end pt-0">
            <Button variant="outline" size="icon" onClick={generateProblem}><RefreshCw className="h-4 w-4" /></Button>
        </CardFooter>
      </>
  );
}

