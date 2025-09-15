"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/app-provider";
import { genLinearEquation, Equation, solveLinearEquation, randInt, solveArithmetic, solveGeometry, solveCalculus } from "@/lib/math";
import { Lightbulb } from "lucide-react";

type QuickTopic = "arithmetic" | "algebra" | "geometry" | "calculus" | "logic";

/**
 * Um gerador de problemas rápidos que permite aos usuários praticar conceitos específicos
 * instantaneamente. O resultado, a verificação e a solução são gerenciados localmente.
 */
export function QuickGenerator() {
    const { dispatch } = useAppContext();
    const [topic, setTopic] = React.useState<QuickTopic>("arithmetic");
    const [problemComponent, setProblemComponent] = React.useState<React.ReactNode | null>(null);

    const handleGenerate = () => {
        switch (topic) {
            case "algebra":
                setProblemComponent(<AlgebraProblem key={Date.now()} />);
                break;
            case "arithmetic":
                setProblemComponent(<ArithmeticProblem key={Date.now()} />);
                break;
            case "geometry":
                setProblemComponent(<GeometryProblem key={Date.now()} />);
                break;
            case "calculus":
                 setProblemComponent(<CalculusProblem key={Date.now()} />);
                break;
            default:
                setProblemComponent(
                    <div className="text-sm text-muted-foreground p-4 text-center">
                        Gerador para {topic} ainda não implementado.
                    </div>
                );
        }
    };
    
    // Gera um problema inicial ao carregar
    React.useEffect(() => {
        handleGenerate();
    }, [topic]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Gerador Rápido</CardTitle>
                <CardDescription>Crie problemas para praticar instantaneamente.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2">
                    <Select onValueChange={(value) => setTopic(value as QuickTopic)} defaultValue="arithmetic">
                        <SelectTrigger className="w-[180px]">
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
                    <Button onClick={handleGenerate}>Gerar Novo</Button>
                </div>
                {problemComponent}
            </CardContent>
        </Card>
    );
}

// Sub-componente genérico para exibir a solução
const Solution = ({ solution, title }: { solution: string[], title: string }) => {
    const [show, setShow] = React.useState(false);
    if (!solution.length) return null;
    return (
        <div className="mt-4">
            <Button variant="ghost" size="sm" onClick={() => setShow(p => !p)}>
                <Lightbulb className="mr-2 h-4 w-4" />
                {show ? "Ocultar Solução" : "Mostrar Solução"}
            </Button>
            {show && (
                <Card className="mt-2 bg-muted/50">
                    <CardHeader className="p-4">
                        <CardTitle className="text-sm">{title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 text-sm font-mono space-y-1">
                        {solution.map((step, index) => <p key={index}>{step}</p>)}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};


const ArithmeticProblem = () => {
    const { dispatch } = useAppContext();
    const [problem] = React.useState(() => {
        const a = randInt(10, 99);
        const b = randInt(10, 99);
        const op = Math.random() > 0.5 ? '+' : '-';
        return { a, b, op: op as '+' | '-', answer: op === '+' ? a + b : a - b };
    });
    const [answer, setAnswer] = React.useState('');
    const [feedback, setFeedback] = React.useState('');
    const [solution, setSolution] = React.useState<string[]>([]);
    
    const checkAnswer = () => {
        if (parseInt(answer) === problem.answer) {
            setFeedback('Correto! +5 XP');
            dispatch({ type: 'ADD_XP', payload: { amount: 5, reason: 'Quick Gen Arithmetic' } });
        } else {
            setFeedback(`Errado. A resposta é ${problem.answer}`);
        }
        setSolution(solveArithmetic(problem.a, problem.b, problem.op));
    };

    return (
        <div className="mt-4 space-y-2">
            <p>Calcule: <strong>{problem.a} {problem.op} {problem.b}</strong></p>
            <div className="flex gap-2">
                <Input value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Resposta" type="number" />
                <Button onClick={checkAnswer}>Verificar</Button>
            </div>
            {feedback && <p className={feedback.startsWith('C') ? 'text-green-600' : 'text-red-600'}>{feedback}</p>}
            <Solution solution={solution} title="Solução de Aritmética" />
        </div>
    );
};

const GeometryProblem = () => {
    const { dispatch } = useAppContext();
    const [problem] = React.useState(() => {
        const base = randInt(5, 20);
        const height = randInt(5, 20);
        return { base, height, answer: base * height };
    });
    const [answer, setAnswer] = React.useState('');
    const [feedback, setFeedback] = React.useState('');
     const [solution, setSolution] = React.useState<string[]>([]);

    const checkAnswer = () => {
        if (parseInt(answer) === problem.answer) {
            setFeedback('Correto! +10 XP');
            dispatch({ type: 'ADD_XP', payload: { amount: 10, reason: 'Quick Gen Geometry' } });
        } else {
            setFeedback(`Errado. A resposta é ${problem.answer}`);
        }
        setSolution(solveGeometry(problem.base, problem.height));
    };

    return (
        <div className="mt-4 space-y-2">
            <p>Qual a área de um retângulo com base <strong>{problem.base}</strong> e altura <strong>{problem.height}</strong>?</p>
            <div className="flex gap-2">
                <Input value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Área" type="number" />
                <Button onClick={checkAnswer}>Verificar</Button>
            </div>
            {feedback && <p className={feedback.startsWith('C') ? 'text-green-600' : 'text-red-600'}>{feedback}</p>}
            <Solution solution={solution} title="Solução de Geometria"/>
        </div>
    );
};

const CalculusProblem = () => {
    const { dispatch } = useAppContext();
    const [problem] = React.useState(() => {
        const coeff = randInt(2, 9);
        const power = randInt(2, 5);
        const expression = `${coeff}x^${power}`;
        return { expression, answer: `${coeff*power}x^${power-1}` };
    });
    const [answer, setAnswer] = React.useState('');
    const [feedback, setFeedback] = React.useState('');
     const [solution, setSolution] = React.useState<string[]>([]);

    const checkAnswer = () => {
        if (answer.replace(/\s/g, '') === problem.answer.replace(/\s/g, '')) {
            setFeedback('Correto! +15 XP');
            dispatch({ type: 'ADD_XP', payload: { amount: 15, reason: 'Quick Gen Calculus' } });
        } else {
            setFeedback(`Errado. A resposta é ${problem.answer}`);
        }
        setSolution(solveCalculus(problem.expression));
    };

    return (
        <div className="mt-4 space-y-2">
            <p>Encontre a derivada de <strong>d/dx ({problem.expression})</strong></p>
            <div className="flex gap-2">
                <Input value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Derivada" type="text" />
                <Button onClick={checkAnswer}>Verificar</Button>
            </div>
            {feedback && <p className={feedback.startsWith('C') ? 'text-green-600' : 'text-red-600'}>{feedback}</p>}
            <Solution solution={solution} title="Solução de Cálculo"/>
        </div>
    );
};


const AlgebraProblem = ({ equation: initialEquation }: { equation?: Equation }) => {
    const { dispatch } = useAppContext();
    const [equation] = React.useState(initialEquation || genLinearEquation());
    const [answer, setAnswer] = React.useState("");
    const [feedback, setFeedback] = React.useState<React.ReactNode | null>(null);
    const [solution, setSolution] = React.useState<string[]>([]);

    const checkAnswer = () => {
        const isCorrect = parseInt(answer) === equation.x;
        if (isCorrect) {
            setFeedback(<div className="text-green-600 font-bold mt-2">Correto! +8 XP</div>);
            dispatch({ type: 'ADD_XP', payload: { amount: 8, reason: 'Quick Generator Algebra' } });
        } else {
            setFeedback(<div className="text-red-600 font-bold mt-2">Errado. A resposta correta é {equation.x}</div>);
        }
        setSolution(solveLinearEquation(equation));
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
                    onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                />
                <Button onClick={checkAnswer}>Verificar</Button>
            </div>
            {feedback}
            <Solution solution={solution} title="Solução de Álgebra" />
        </div>
    );
};

