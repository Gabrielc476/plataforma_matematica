"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";

/**
 * Um painel interativo para visualizar conceitos de geometria.
 * Atualmente, renderiza um SVG com um triângulo cujos vértices podem ser
 * arrastados para recalcular a área em tempo real.
 */
export function InteractiveGeometry() {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [points, setPoints] = React.useState([
    { x: 80, y: 160 },
    { x: 200, y: 40 },
    { x: 320, y: 160 },
  ]);
  const [area, setArea] = React.useState(0);
  const { theme } = useTheme();

  // Calcula a área sempre que os pontos mudam
  React.useEffect(() => {
    const [p1, p2, p3] = points;
    const calculatedArea = Math.abs(
      (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2
    );
    setArea(calculatedArea);
  }, [points]);

  // Lógica para arrastar os pontos
  const handlePointerDown = (index: number, e: React.PointerEvent<SVGCircleElement>) => {
    const target = e.target as SVGCircleElement;
    target.setPointerCapture(e.pointerId);

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      let x = moveEvent.clientX - rect.left;
      let y = moveEvent.clientY - rect.top;
      
      // Limita os pontos aos limites do SVG
      x = Math.max(10, Math.min(390, x));
      y = Math.max(10, Math.min(210, y));

      setPoints(currentPoints => 
        currentPoints.map((p, i) => (i === index ? { x, y } : p))
      );
    };

    const handlePointerUp = () => {
      target.releasePointerCapture(e.pointerId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const strokeColor = theme === 'dark' ? '#7dd3fc' : '#3b82f6';
  const fillColor = theme === 'dark' ? 'rgba(125,211,252,0.1)' : 'rgba(59,130,246,0.1)';
  const textColor = theme === 'dark' ? '#9be7ff' : '#0284c7';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Triângulo Interativo</CardTitle>
        <CardDescription>Arraste os pontos para ver a área a mudar.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/50 rounded-md p-2">
            <svg ref={svgRef} viewBox="0 0 400 220" className="w-full h-auto cursor-grab">
                <polygon
                    points={points.map(p => `${p.x},${p.y}`).join(" ")}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth="1"
                />
                {points.map((p, i) => (
                    <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r="8"
                        fill={theme === 'dark' ? '#0b1220' : '#ffffff'}
                        stroke={strokeColor}
                        className="cursor-grabbing"
                        onPointerDown={(e) => handlePointerDown(i, e)}
                    />
                ))}
                <text x="10" y="25" fill={textColor} className="font-sans font-semibold text-sm">
                    Área: {area.toFixed(0)} px²
                </text>
            </svg>
        </div>
      </CardContent>
    </Card>
  );
}

