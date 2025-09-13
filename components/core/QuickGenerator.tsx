"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/app-provider";
import { genLinearEquation, Equation } from "@/lib/math";

type QuickTopic = "arithmetic" | "algebra" | "geometry" | "calculus" | "logic";

/**
 * Um gerador de problemas rápidos que permite aos usuários praticar conceitos específicos
 * instantaneamente. O resultado e a verificação são gerenciados localmente neste componente.
 */
export function QuickGenerator() {
    const { dispatch } = useAppContext();
    const [topic, setTopic] = React.useState<QuickTopic>("arithmetic");
    const [generatedProblem, setGeneratedProblem] = React.useState<React.ReactNode | null>(null);

    const handleGenerate = () => {
        // Lógica de geração de problemas baseada no tópico selecionado
        if (topic === "algebra") {
            const eq = genLinearEquation();
            setGeneratedProblem(<AlgebraProblem equation={eq} />);
        } else {
             setGeneratedProblem(
                <div className="text-sm text-muted-foreground p-4 text-center">
                    Gerador para {topic} ainda não implementado.
                </div>
            );
        }
    };

    // Componente interno para lidar com o problema de álgebra
    const AlgebraProblem = ({ equation }: { equation: Equation }) => {
        const [answer, setAnswer] = React.useState("");
        const [feedback, setFeedback] = React.useState<React.ReactNode | null>(null);

        const checkAnswer = () => {
            if (parseInt(answer) === equation.x) {
                setFeedback(<div className="text-green-600 font-bold mt-2">Correto! +8 XP</div>);
                // Ação de dispatch corrigida para enviar um objeto
                dispatch({ type: 'ADD_XP', payload: { amount: 8, reason: 'Quick Generator Algebra' } });
            } else {
                setFeedback(<div className="text-red-600 font-bold mt-2">Errado. A resposta é {equation.x}</div>);
            }
        };

        return (
            <div className="mt-4 space-y-2">
                <p>Resolva a equação: <strong>{equation.text}</strong></p>
                <div className="flex gap-2">
                    <Input 
                        value={answer} 
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="x = ?" 
                        type="number"
                    />
                    <Button onClick={checkAnswer}>Verificar</Button>
                </div>
                {feedback}
            </div>
        );
    };


    return (
        <Card>
            <CardHeader>
                <CardTitle>Gerador Rápido</CardTitle>
                <CardDescription>Crie problemas para praticar instantaneamente.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2">
                    <Select onValueChange={(value) => setTopic(value as QuickTopic)} defaultValue="arithmetic">
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione um tópico" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="arithmetic">Aritmética</SelectItem>
                            <SelectItem value="algebra">Álgebra</SelectItem>
                            <SelectItem value="geometry">Geometria</SelectItem>
                            <SelectItem value="calculus">Cálculo</SelectItem>
                            <SelectItem value="logic">Lógica</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={handleGenerate}>Gerar</Button>
                </div>
                {generatedProblem}
            </CardContent>
        </Card>
    );
}

