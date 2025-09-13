"use client";

import { TopicsList } from "./TopicsList";
import { ProgressCard } from "./ProgressCard";
import { Leaderboard } from "./LeaderBoard";
import { Separator } from "@/components/ui/separator";

/**
 * A Sidebar é um container que organiza os componentes da barra lateral.
 * Ela agrupa a lista de tópicos, o card de progresso do usuário e o leaderboard.
 * Separadores são usados para dividir visualmente cada seção.
 */
export function Sidebar() {
  return (
    <aside className="sticky top-20 space-y-6">
      <TopicsList />
      <Separator />
      <ProgressCard />
      <Separator />
      <Leaderboard />
    </aside>
  );
}
