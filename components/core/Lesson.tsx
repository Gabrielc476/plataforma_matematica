"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/app-provider";
import { topics } from "@/data/topics";
import { AlgebraLesson } from "../lessons/AlgebraLesson";
import { ArithmeticLesson } from "../lessons/ArithmeticLesson";
import { GeometryLesson } from "../lessons/GeometryLesson";
import { CalculusLesson } from "../lessons/CalculusLesson";

/**
 * Exibe a lição ou o modo de prática para o tópico selecionado.
 * Atua como um "roteador" para renderizar o componente de lição correto.
 */
export function Lesson() {
    const { state, dispatch } = useAppContext();
    const { currentTopicKey, currentLessonIndex, isPracticing } = state;

    // Acessa o tópico e a lição com base no estado atual
    const topic = topics[currentTopicKey];
    const lesson = topic.lessons[currentLessonIndex];

    const renderPracticeComponent = () => {
        switch (currentTopicKey) {
            case 'algebra':
                return <AlgebraLesson />;
            case 'arithmetic':
                return <ArithmeticLesson />;
            case 'geometry':
                return <GeometryLesson />;
            case 'calculus':
                return <CalculusLesson />;
            default:
                return (
                    <div className="text-center p-8">
                        <p>O modo de prática para {topic.title} ainda não foi implementado.</p>
                        <Button className="mt-4" onClick={() => dispatch({ type: 'SET_PRACTICING', payload: false })}>
                            Voltar à Lição
                        </Button>
                    </div>
                );
        }
    };
    
    // Se estiver no modo de prática, renderiza o componente de exercício
    if (isPracticing) {
        return (
            <Card>
                {renderPracticeComponent()}
            </Card>
        );
    }

    // Caso contrário, mostra a descrição da lição e o botão para praticar
    return (
        <Card>
            <CardHeader>
                <CardTitle>{lesson.title}</CardTitle>
                <CardDescription>Tópico: {topic.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {lesson.content}
                </p>
            </CardContent>
             <CardFooter className="flex justify-between">
                <div />
                <Button onClick={() => dispatch({ type: 'SET_PRACTICING', payload: true })}>
                    Praticar este assunto
                </Button>
            </CardFooter>
        </Card>
    );
}

