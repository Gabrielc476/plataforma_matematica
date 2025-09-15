"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/app-provider";
import { Equation, genLinearEquation, solveLinearEquation } from "@/lib/math";
import { Lightbulb, RefreshCw } from "lucide-react";

/**
 * Painel interativo para a prática de Álgebra.
 * Permite ao utilizador gerar equações lineares e ver a sua resolução passo a passo.
 * Este componente complementa os exercícios de prática.
 */
export function InteractiveAlgebra() {
  const { dispatch } = useAppContext();
  const [equation, setEquation] = React.useState<Equation | null>(null);
  const [solution, setSolution] = React.useState<string[]>([]);
  const [showSolution, setShowSolution] = React.useState(false);

  const handleGenerate = () => {
    const newEquation = genLinearEquation();
    setEquation(newEquation);
    setSolution(solveLinearEquation(newEquation));
    setShowSolution(false); // Oculta a solução ao gerar uma nova equação
    dispatch({ type: "ADD_XP", payload: { amount: 2, reason: "Gerou equação" }});
  };

  const toggleSolution = () => {
    if (equation) {
      setShowSolution(prev => !prev);
    }
  };
  
  // Gera uma equação ao carregar o componente pela primeira vez
  React.useEffect(() => {
    handleGenerate();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Explorador de Equações</CardTitle>
        <CardDescription>
          Gere equações e veja a solução passo a passo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleGenerate} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Gerar Nova Equação
        </Button>

        {equation && (
          <div className="mt-6 space-y-4">
            <p className="text-center text-xl font-mono p-4 bg-muted rounded-md">
              {equation.text}
            </p>
            
            <Button variant="outline" className="w-full" onClick={toggleSolution}>
              <Lightbulb className="mr-2 h-4 w-4" />
              {showSolution ? "Ocultar Solução" : "Mostrar Solução"}
            </Button>

            {showSolution && (
              <div className="mt-2 p-4 bg-muted/50 rounded-md text-sm font-mono space-y-2 border">
                {solution.map((step, index) => (
                  <p key={index}>{step}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

