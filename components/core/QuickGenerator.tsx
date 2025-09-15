"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/app-provider";
import { 
    genLinearEquation, Equation, solveLinearEquation, 
    QuadraticEquation, genQuadraticEquation, solveQuadraticEquation, 
    solveArithmetic, solveGeometry, solveCalculus, genCircleProblem, solveCircleArea, randInt, derivePolynomial 
} from "@/lib/math";
import { Lightbulb } from "lucide-react";

type QuickTopic = "arithmetic" | "linear_equation" | "quadratic_equation" | "rectangle_area" | "circle_area" | "calculus";

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
                    <CardHeader className="p-4"><CardTitle className="text-sm">{title}</CardTitle></CardHeader>
                    <CardContent className="p-4 text-sm font-mono space-y-1">
                        {solution.map((step, index) => <p key={index}>{step}</p>)}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export function QuickGenerator() {
    const [topic, setTopic] = React.useState<QuickTopic>("arithmetic");
    const [problem, setProblem] = React.useState<React.ReactNode | null>(null);

    const generateProblem = (selectedTopic: QuickTopic) => {
        switch (selectedTopic) {
            case 'linear_equation':
                setProblem(<Problem host={AlgebraProblem} />);
                break;
            case 'quadratic_equation':
                setProblem(<Problem host={QuadraticProblem} />);
                break;
             case 'rectangle_area':
                setProblem(<Problem host={RectangleProblem} />);
                break;
            case 'circle_area':
                setProblem(<Problem host={CircleProblem} />);
                break;
            default:
                 setProblem(
                    <div className="text-sm text-muted-foreground p-4 text-center">
                        Gerador para este tópico ainda não implementado.
                    </div>
                );
        }
    };
    
    // Componente Wrapper para gerir estado comum
    const Problem = ({ host: ProblemComponent }: { host: React.ElementType }) => (
        <div className="mt-4 space-y-2">
            <ProblemComponent />
        </div>
    );
    
    const AlgebraProblem = () => {
        const { dispatch } = useAppContext();
        const [equation, setEquation] = React.useState(genLinearEquation());
        const [answer, setAnswer] = React.useState("");
        const [feedback, setFeedback] = React.useState<React.ReactNode | null>(null);
        const [solution, setSolution] = React.useState<string[]>([]);

        const checkAnswer = () => {
            const isCorrect = parseInt(answer) === equation.x;
            setFeedback(isCorrect ? <div className="text-green-600 font-bold mt-2">Correto! +8 XP</div> : <div className="text-red-600 font-bold mt-2">Errado. A resposta é {equation.x}</div>);
            if (isCorrect) dispatch({ type: 'ADD_XP', payload: { amount: 8, reason: 'Quick Gen Algebra' } });
            setSolution(solveLinearEquation(equation));
        };
        return <>
            <p>Resolva: <strong>{equation.text}</strong></p>
            <div className="flex gap-2">
                <Input value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="x = ?" type="number" onKeyDown={(e) => e.key === 'Enter' && checkAnswer()} />
                <Button onClick={checkAnswer}>Verificar</Button>
            </div>
            {feedback}
            <Solution solution={solution} title="Resolução" />
        </>;
    };
    
    const QuadraticProblem = () => {
        const { dispatch } = useAppContext();
        const [equation, setEquation] = React.useState(genQuadraticEquation());
        const [answer, setAnswer] = React.useState("");
        const [feedback, setFeedback] = React.useState<React.ReactNode | null>(null);
        const [solution, setSolution] = React.useState<string[]>([]);
        
        const checkAnswer = () => {
            const userRoots = answer.split(',').map(n => parseInt(n.trim())).sort((a,b) => a-b);
            const correctRoots = equation.roots;
            const isCorrect = userRoots.length === correctRoots.length && userRoots.every((val, index) => val === correctRoots[index]);
            setFeedback(isCorrect ? <div className="text-green-600 font-bold mt-2">Correto! +12 XP</div> : <div className="text-red-600 font-bold mt-2">Errado. As raízes são {correctRoots.join(', ')}</div>);
            if(isCorrect) dispatch({ type: 'ADD_XP', payload: { amount: 12, reason: 'Quick Gen Quadratic' } });
            setSolution(solveQuadraticEquation(equation));
        };
        return <>
            <p>Encontre as raízes de: <strong>{equation.text}</strong></p>
             <div className="flex gap-2">
                <Input value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Raízes (ex: -2, 5)" onKeyDown={(e) => e.key === 'Enter' && checkAnswer()} />
                <Button onClick={checkAnswer}>Verificar</Button>
            </div>
            {feedback}
            <Solution solution={solution} title="Resolução (Bhaskara)"/>
        </>;
    };

    const RectangleProblem = () => {
        const { dispatch } = useAppContext();
        const [dims, setDims] = React.useState({ base: randInt(2,20), height: randInt(2,20) });
        const [answer, setAnswer] = React.useState("");
        const [feedback, setFeedback] = React.useState<React.ReactNode | null>(null);
        const [solution, setSolution] = React.useState<string[]>([]);
        const correctAnswer = dims.base * dims.height;

        const checkAnswer = () => {
             const isCorrect = parseInt(answer) === correctAnswer;
            setFeedback(isCorrect ? <div className="text-green-600 font-bold mt-2">Correto! +7 XP</div> : <div className="text-red-600 font-bold mt-2">Errado. A resposta é {correctAnswer}</div>);
            if(isCorrect) dispatch({ type: 'ADD_XP', payload: { amount: 7, reason: 'Quick Gen Rectangle' } });
            setSolution(solveGeometry(dims.base, dims.height));
        };
        
        return <>
            <p>Área de um retângulo com base <strong>{dims.base}</strong> e altura <strong>{dims.height}</strong>:</p>
            <div className="flex gap-2">
                <Input value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Área" type="number" onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}/>
                <Button onClick={checkAnswer}>Verificar</Button>
            </div>
            {feedback}
            <Solution solution={solution} title="Solução"/>
        </>;
    };
    
     const CircleProblem = () => {
        const { dispatch } = useAppContext();
        const [problemData, setProblemData] = React.useState(genCircleProblem());
        const [answer, setAnswer] = React.useState("");
        const [feedback, setFeedback] = React.useState<React.ReactNode | null>(null);
        const [solution, setSolution] = React.useState<string[]>([]);
        
        const checkAnswer = () => {
            const isCorrect = Math.abs(parseFloat(answer) - problemData.area) < 0.1;
            setFeedback(isCorrect ? <div className="text-green-600 font-bold mt-2">Correto! +9 XP</div> : <div className="text-red-600 font-bold mt-2">Errado. A resposta é ~{problemData.area.toFixed(2)}</div>);
            if(isCorrect) dispatch({ type: 'ADD_XP', payload: { amount: 9, reason: 'Quick Gen Circle' } });
            setSolution(solveCircleArea(problemData.radius));
        };
        
        return <>
            <p>Área de um círculo com raio <strong>{problemData.radius}</strong> (use π ≈ 3.14):</p>
            <div className="flex gap-2">
                <Input value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Área" type="number" onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}/>
                <Button onClick={checkAnswer}>Verificar</Button>
            </div>
            {feedback}
            <Solution solution={solution} title="Solução"/>
        </>;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Gerador Rápido</CardTitle>
                <CardDescription>Crie problemas para praticar instantaneamente.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2">
                    <Select onValueChange={(value) => setTopic(value as QuickTopic)} defaultValue={topic}>
                        <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="Selecione um tópico" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="arithmetic">Aritmética (Operações)</SelectItem>
                            <SelectItem value="linear_equation">Álgebra (Eq. Linear)</SelectItem>
                            <SelectItem value="quadratic_equation">Álgebra (Eq. Quadrática)</SelectItem>
                            <SelectItem value="rectangle_area">Geometria (Área Retângulo)</SelectItem>
                             <SelectItem value="circle_area">Geometria (Área Círculo)</SelectItem>
                            <SelectItem value="calculus">Cálculo (Derivadas)</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={() => generateProblem(topic)}>Gerar</Button>
                </div>
                {problem}
            </CardContent>
        </Card>
    );
}

