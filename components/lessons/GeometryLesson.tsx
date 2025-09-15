"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/app-provider";
import { randInt, solveGeometry } from "@/lib/math";
import { ArrowLeft, Lightbulb, RefreshCw, X } from "lucide-react";
import { InteractiveGeometry } from "../interactive/InteractiveGeometry";

// Componente genérico de solução
const Solution = ({ solution, title }: { solution: string[], title: string }) => {
    const [show, setShow] = React.useState(false);
    if (!solution.length) return null;
    return (
        <div className="mt-4 text-center">
            <Button variant="ghost" size="sm" onClick={() => setShow(p => !p)}>
                <Lightbulb className="mr-2 h-4 w-4" />
                {show ? "Ocultar Solução" : "Mostrar Solução"}
            </Button>
            {show && (
                <Card className="mt-2 bg-muted/50 text-left">
                    <CardContent className="p-4 text-sm font-mono space-y-1">
                        {solution.map((step, index) => <p key={index}>{step}</p>)}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export function GeometryLesson() {
  const { state, dispatch } = useAppContext();
  const { currentLessonIndex } = state;

  const handleExitPractice = () => {
    dispatch({ type: "SET_PRACTICING", payload: false });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* Coluna da Esquerda: Exercício */}
      <Card className="flex flex-col h-full relative">
         <Button variant="ghost" size="icon" className="absolute top-3 right-3" onClick={handleExitPractice}>
            <X className="h-4 w-4" /><span className="sr-only">Sair</span>
        </Button>
        <CardHeader>
          <CardTitle>Prática: {currentLessonIndex === 0 ? "Área do Retângulo" : "Área do Círculo"}</CardTitle>
          <CardDescription>Calcule a área com os valores dados.</CardDescription>
        </CardHeader>
        {currentLessonIndex === 0 ? <RectangleAreaPractice /> : <div>Lição não implementada</div>}
      </Card>
      
      {/* Coluna da Direita: Painel Interativo */}
      <InteractiveGeometry />
    </div>
  );
}


// Sub-componente para área do retângulo
function RectangleAreaPractice() {
  const { dispatch } = useAppContext();
  const [problem, setProblem] = React.useState({ base: 0, height: 0, answer: 0 });
  const [userAnswer, setUserAnswer] = React.useState("");
  const [feedback, setFeedback] = React.useState<React.ReactNode | null>(null);
  const [solution, setSolution] = React.useState<string[]>([]);

  const generateProblem = React.useCallback(() => {
    const base = randInt(5, 20);
    const height = randInt(5, 20);
    setProblem({ base, height, answer: base * height });
    setUserAnswer("");
    setFeedback(null);
    setSolution([]);
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
    setSolution(solveGeometry(problem.base, problem.height));
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
            <Solution solution={solution} title="Solução"/>
        </CardContent>
        <CardFooter className="flex justify-end">
            <Button variant="outline" size="icon" onClick={generateProblem}><RefreshCw className="h-4 w-4" /></Button>
        </CardFooter>
      </>
  );
}

