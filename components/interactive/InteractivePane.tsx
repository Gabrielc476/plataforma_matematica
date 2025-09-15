"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/context/app-provider";
import { topics } from "@/data/topics";
import { InteractiveGeometry } from "./InteractiveGeometry";
import { InteractiveAlgebra } from "./InteractiveAlgebra";

/**
 * Este componente atua como um "roteador" para a área interativa.
 * Ele verifica qual tópico está selecionado no estado global e renderiza
 * o componente interativo correspondente a esse tópico.
 */
export function InteractivePane() {
    const { state } = useAppContext();
    const { currentTopicKey, isPracticing } = state;

    // Não mostra o painel interativo durante a prática, pois ele já está integrado na lição
    if (isPracticing) {
        return null;
    }

    const renderInteractiveContent = () => {
        switch (currentTopicKey) {
            case "algebra":
                return <InteractiveAlgebra />;
            case "geometry":
                return <InteractiveGeometry />;
            case "calculus":
                 return <p className="text-sm text-muted-foreground">Componente de Cálculo Interativo aqui.</p>
            case "arithmetic":
                 return <p className="text-sm text-muted-foreground">Componente de Aritmética Interativa aqui.</p>
            default:
                return <p className="text-sm text-muted-foreground">Selecione um tópico com um painel interativo, como Álgebra ou Geometria.</p>
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Interativo</CardTitle>
                <CardDescription>
                    {topics[currentTopicKey]?.title || "Painel"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {renderInteractiveContent()}
            </CardContent>
        </Card>
    );
}

