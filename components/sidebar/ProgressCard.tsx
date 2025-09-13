"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAppContext } from "@/context/app-provider";

/**
 * Exibe o progresso atual do usuário, incluindo seu nível, XP (pontos de experiência)
 * e uma barra de progresso visual que mostra o quão perto ele está do próximo nível.
 */
export function ProgressCard() {
  const { state } = useAppContext();
  const { xp, level } = state;

  const nextLevelXp = level * 50;
  const progressPercentage = nextLevelXp > 0 ? (xp / nextLevelXp) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Progresso</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Progress value={progressPercentage} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Nível: {level}</span>
            <span>
              XP: {xp} / {nextLevelXp}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
