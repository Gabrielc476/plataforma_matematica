"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/context/app-provider";
import { topics } from "@/data/topics";
// Importe aqui os futuros componentes interativos
// import { InteractiveGeometry } from "./InteractiveGeometry";
// import { InteractiveCalculus } from "./InteractiveCalculus";

/**
 * Este componente atua como um "roteador" para a área interativa.
 * Ele verifica qual tópico está selecionado no estado global e renderiza
 * o componente interativo correspondente a esse tópico.
 */
export function InteractivePane() {
    const { state } = useAppContext();
    const currentTopicKey = state.currentTopicKey;

    const renderInteractiveContent = () => {
        switch (currentTopicKey) {
            case "geometry":
                // return <InteractiveGeometry />;
                return <p className="text-sm text-muted-foreground">Componente de Geometria Interativa aqui.</p>
            case "calculus":
                // return <InteractiveCalculus />;
                 return <p className="text-sm text-muted-foreground">Componente de Cálculo Interativo aqui.</p>
            case "arithmetic":
                 return <p className="text-sm text-muted-foreground">Componente de Aritmética Interativa aqui.</p>
            default:
                return <p className="text-sm text-muted-foreground">Selecione um tópico com um painel interativo, como Geometria ou Cálculo.</p>
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
