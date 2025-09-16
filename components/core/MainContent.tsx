"use client";

import { InteractivePane } from "@/components/interactive/InteractivePane";
import { Lesson } from "./Lesson";
import { QuickGenerator } from "./QuickGenerator";
import { Workspace } from "./Workspace";
import { Console } from "./Console"; // Importa o novo componente

/**
 * MainContent é o container para a área principal de aprendizado.
 */
export function MainContent() {
  return (
    <div className="flex flex-col gap-8 xl:flex-row">
      {/* Coluna Principal (à esquerda em telas grandes) */}
      <div className="flex-1 space-y-8">
        <Lesson />
        <QuickGenerator />
        <Workspace />
      </div>

      {/* Coluna Lateral (à direita em telas grandes) */}
      <aside className="w-full xl:w-[380px] xl:sticky top-20 self-start space-y-8">
        <InteractivePane />
        <Console /> {/* Substitui o Card estático pelo componente dinâmico */}
      </aside>
    </div>
  );
}

