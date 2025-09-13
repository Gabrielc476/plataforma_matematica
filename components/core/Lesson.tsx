"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/app-provider";
import { topics } from "@/data/topics";

/**
 * Exibe o conteúdo da lição atualmente selecionada pelo usuário na sidebar.
 * Obtém o tópico e o índice da lição do estado global e renderiza
 * o título e a descrição correspondentes.
 */
export function Lesson() {
    const { state } = useAppContext();
    const { currentTopicKey, currentLessonIndex } = state;

    // Acessa o tópico e a lição com base no estado atual
    const topic = topics[currentTopicKey];
    const lesson = topic.lessons[currentLessonIndex];

    return (
        <Card>
            <CardHeader>
                <CardTitle>{lesson.title}</CardTitle>
                <CardDescription>Tópico: {topic.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    {lesson.content}
                </p>
                <div className="flex gap-2">
                    <Button>Praticar este assunto</Button>
                    <Button variant="ghost">Ver exemplos</Button>
                </div>
            </CardContent>
        </Card>
    );
}
