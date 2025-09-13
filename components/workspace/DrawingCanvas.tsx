"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Uma tela para desenhar e inserir símbolos matemáticos.
 * (Este é um placeholder para a implementação real)
 */
export function DrawingCanvas() {
    return (
        <Card className="mt-4 border-dashed">
            <CardHeader>
                <CardTitle>Tela de Desenho</CardTitle>
                <CardDescription>
                    Use este espaço para desenhar e anotar livremente.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-center py-8 text-muted-foreground">
                    [A tela de desenho será implementada aqui]
                </p>
            </CardContent>
        </Card>
    )
}
