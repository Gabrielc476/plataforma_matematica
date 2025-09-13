"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { topics } from "@/data/topics";
import { useAppContext } from "@/context/app-provider";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

/**
 * Componente que exibe a lista de tópicos de estudo disponíveis.
 * Permite que o usuário filtre os tópicos por nome e selecione um para estudar.
 * A seleção de um tópico atualiza o estado global da aplicação.
 */
export function TopicsList() {
  const { state, dispatch } = useAppContext();
  const [filter, setFilter] = React.useState("");

  const filteredTopics = Object.entries(topics).filter(([_, topic]) =>
    topic.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Assuntos</CardTitle>
        <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Buscar assunto..."
                className="pl-9"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
        </div>
      </CardHeader>
      <CardContent className="max-h-60 overflow-y-auto pr-3">
        <div className="flex flex-col gap-2">
          {filteredTopics.map(([key, topic]) => (
            <Button
              key={key}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left h-auto py-2",
                state.currentTopicKey === key && "bg-accent text-accent-foreground"
              )}
              onClick={() =>
                dispatch({ type: "SET_TOPIC", payload: key as keyof typeof topics })
              }
            >
              <div>
                <div className="font-semibold">{topic.title}</div>
                <div className="text-xs font-normal text-muted-foreground">
                  {topic.lessons.length} lições
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

