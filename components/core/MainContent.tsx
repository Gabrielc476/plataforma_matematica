"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractivePane } from "@/components/interactive/InteractivePane";
import { Lesson } from "./Lesson";
import { QuickGenerator } from "./QuickGenerator";
import { Workspace } from "./Workspace";

/**
 * MainContent é o container para a área principal de aprendizado.
 * Ele é dividido em duas colunas:
 * 1. A coluna da esquerda contém a Lição, o Gerador Rápido e a Área de Trabalho.
 * 2. A coluna da direita contém o Painel Interativo, que muda de acordo com o tópico.
 */
export function MainContent() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8">
      <div className="space-y-8">
        <Lesson />
        <QuickGenerator />
        <Workspace />
      </div>

      <aside className="sticky top-20 space-y-8">
        <InteractivePane />
         <Card>
            <CardHeader>
                <CardTitle className="text-lg">Console / Solução</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    Respostas e passos aparecerão aqui.
                </p>
            </CardContent>
        </Card>
      </aside>
    </div>
  );
}

