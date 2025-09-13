"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator } from "../workspace/Calculator";
import { FormulaDeconstructor } from "../workspace/FormulaDeconstructor";
import { DrawingCanvas } from "../workspace/DrawingCanvas";

/**
 * A Área de Trabalho contém ferramentas de apoio como a Calculadora e o Desconstrutor de Fórmulas.
 * O estado do Desconstrutor é mantido aqui para persistir entre as trocas de abas.
 */
export function Workspace() {
  // O estado do FormulaDeconstructor é elevado para este componente pai
  // para que o texto não se perca ao mudar de aba.
  const [formula, setFormula] = React.useState("7x - 5 = -75");
  const [manualSteps, setManualSteps] = React.useState(
`7x - 5 = -75
7x = -75 + 5
7x = -70
x = -70 / 7
x = -10`
  );

  return (
    <Tabs defaultValue="calculator" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="calculator">Calculadora</TabsTrigger>
        <TabsTrigger value="deconstructor">Resolver Fórmula</TabsTrigger>
        <TabsTrigger value="canvas">Desenhar</TabsTrigger>
      </TabsList>
      <TabsContent value="calculator">
        <Calculator />
      </TabsContent>
      <TabsContent value="deconstructor">
        {/* Passamos o estado e as funções de atualização como props */}
        <FormulaDeconstructor
          formula={formula}
          setFormula={setFormula}
          manualSteps={manualSteps}
          setManualSteps={setManualSteps}
        />
      </TabsContent>
      <TabsContent value="canvas">
        <DrawingCanvas />
      </TabsContent>
    </Tabs>
  );
}

