"use client";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/context/app-provider";
import { ThemeToggle } from "./ThemeToggle";
import { BrainCircuit } from "lucide-react";

/**
 * O Header da aplicação.
 * Exibe o título, controles de usuário como o nome para o ranking, a sequência (streak) de
 * respostas corretas e o botão para alternar o tema da interface.
 */
export function Header() {
  const { state } = useAppContext();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <BrainCircuit className="h-7 w-7 text-primary" />
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              Plataforma de Matemática
            </h1>
            <p className="text-xs text-muted-foreground">
              Do básico ao avançado
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Input placeholder="Seu nome (ranking)" className="w-40 h-9 hidden sm:flex" />
          <Badge variant="secondary">Nível: Fácil</Badge>
          <Badge>🔥 {state.streak}</Badge>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
