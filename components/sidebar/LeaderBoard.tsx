"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppContext } from "@/context/app-provider";
import { Trash2, Save } from "lucide-react";

type Score = {
  name: string;
  level: number;
  xp: number;
};

/**
 * O Leaderboard exibe as melhores pontuações salvas localmente no navegador.
 * O usuário pode salvar sua pontuação atual ou limpar todo o placar.
 */
export function Leaderboard() {
  const { state } = useAppContext();
  const [scores, setScores] = React.useState<Score[]>([]);

  React.useEffect(() => {
    try {
      const savedScores = localStorage.getItem("math-leaderboard");
      if (savedScores) {
        setScores(JSON.parse(savedScores));
      }
    } catch (error) {
        console.error("Failed to parse leaderboard from localStorage", error);
        setScores([]);
    }
  }, []);

  const handleSaveScore = () => {
    const name = prompt("Digite seu nome para salvar no ranking:", "Anônimo");
    if (name) {
      const totalXp = state.xp + (state.level - 1) * 50;
      const newScores = [...scores, { name, level: state.level, xp: totalXp }]
        .sort((a, b) => b.xp - a.xp)
        .slice(0, 10); // Manter apenas os 10 melhores

      setScores(newScores);
      localStorage.setItem("math-leaderboard", JSON.stringify(newScores));
    }
  };

  const handleClearBoard = () => {
    if (confirm("Tem certeza que deseja limpar o ranking?")) {
      setScores([]);
      localStorage.removeItem("math-leaderboard");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Leaderboard</CardTitle>
        <CardDescription>Ranking local</CardDescription>
      </CardHeader>
      <CardContent className="max-h-48 overflow-y-auto pr-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30px]">#</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead className="text-right">XP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scores.length > 0 ? (
              scores.map((score, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{score.name}</TableCell>
                  <TableCell className="text-right">{score.xp}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  Nenhuma pontuação.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between pt-4">
        <Button size="sm" variant="outline" onClick={handleClearBoard}>
          <Trash2 className="mr-2 h-4 w-4" />
          Limpar
        </Button>
        <Button size="sm" onClick={handleSaveScore}>
          <Save className="mr-2 h-4 w-4" />
          Salvar
        </Button>
      </CardFooter>
    </Card>
  );
}
