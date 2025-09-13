"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

// 1. Define as propriedades que o componente receberá de seu pai (Workspace)
interface FormulaDeconstructorProps {
  formula: string;
  setFormula: (formula: string) => void;
  manualSteps: string;
  setManualSteps: (steps: string) => void;
}

/**
 * Uma área de trabalho manual para o utilizador decompor e resolver expressões matemáticas.
 * Este componente é "controlado", recebendo seu estado do componente pai.
 */
export function FormulaDeconstructor({
  formula,
  setFormula,
  manualSteps,
  setManualSteps,
}: FormulaDeconstructorProps) {
  
  const handleClear = () => {
    setManualSteps(""); // Atualiza o estado no componente pai
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Área de Trabalho de Fórmulas</CardTitle>
        <CardDescription>
          Use este espaço para decompor e resolver as suas fórmulas manualmente.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
            <label htmlFor="formula-input" className="text-sm font-medium">Fórmula Original</label>
            <Input 
                id="formula-input"
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                placeholder="Ex: (5 + 3) * 2"
            />
        </div>

        <Separator className="my-6" />

        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label htmlFor="deconstruction-area" className="text-sm font-medium">A sua resolução:</label>
                <Button variant="ghost" size="sm" onClick={handleClear}>Limpar</Button>
            </div>
            <Textarea
                id="deconstruction-area"
                className="font-mono min-h-[200px] text-base"
                placeholder={
`Comece a decompor a sua fórmula aqui. Exemplo:
= 5 * 4 - 10 / 5
= 20 - 2
= 18`
                }
                value={manualSteps}
                onChange={(e) => setManualSteps(e.target.value)}
            />
        </div>
      </CardContent>
    </Card>
  );
}

