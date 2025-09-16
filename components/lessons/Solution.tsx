"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SolutionProps {
    title: string;
    steps: string[];
    onClose: () => void;
}

/**
 * Um componente reutilizável para exibir os passos de uma solução.
 */
export function Solution({ title, steps, onClose }: SolutionProps) {
    return (
        <Card className="mt-4 bg-muted/50 relative">
            <Button variant="ghost" size="icon" className="absolute top-3 right-3" onClick={onClose}>
                <X className="h-4 w-4" />
            </Button>
            <CardHeader>
                <CardTitle className="text-base">{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm font-mono space-y-1">
                {steps.map((step, index) => (
                    <p key={index}>{step}</p>
                ))}
            </CardContent>
        </Card>
    );
}
