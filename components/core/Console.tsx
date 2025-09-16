"use client";

import { useAppContext } from "@/context/app-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";

/**
 * Exibe conteúdo dinâmico, como soluções de problemas ou outras informações,
 * que são enviadas de outros componentes através do estado global.
 */
export function Console() {
  const { state, dispatch } = useAppContext();
  const { title, lines } = state.consoleContent;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <Button 
            variant="ghost" 
            size="icon"
            onClick={() => dispatch({ type: "CLEAR_CONSOLE" })}
        >
          <Eraser className="h-4 w-4" />
          <span className="sr-only">Limpar Console</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground font-mono space-y-1 bg-muted/50 p-4 rounded-md min-h-[80px]">
          {lines.map((line, index) => (
            <p key={index} className="break-words">{line}</p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
