"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Eraser } from "lucide-react";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input"; // Corrigido: Importação em falta

/**
 * Uma tela interativa para desenhar e inserir símbolos matemáticos.
 * Inclui controlos para cor, tamanho do pincel e inserção de símbolos.
 */
export function DrawingCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const contextRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const { theme } = useTheme();

  const [isDrawing, setIsDrawing] = React.useState(false);
  const [brushColor, setBrushColor] = React.useState("#000000");
  const [brushSize, setBrushSize] = React.useState(3);
  const [lastClickPos, setLastClickPos] = React.useState<{ x: number; y: number } | null>(null);

  // Efeito para configurar o canvas e o seu contexto
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Ajusta o tamanho do canvas com base no seu tamanho de renderização CSS
    const resizeCanvas = () => {
        const { width, height } = canvas.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");
        if (context) {
            context.lineCap = "round";
            context.lineJoin = "round";
            context.strokeStyle = brushColor;
            context.lineWidth = brushSize;
            contextRef.current = context;
        }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
        window.removeEventListener('resize', resizeCanvas);
    };
  }, [brushColor, brushSize]); // Corrigido: Adicionadas dependências em falta

  // Efeito para atualizar as propriedades do contexto quando estas mudam
  React.useEffect(() => {
    const context = contextRef.current;
    if (context) {
      context.strokeStyle = brushColor;
      context.lineWidth = brushSize;
    }
  }, [brushColor, brushSize]);

  // Obtém a posição correta para eventos de rato e toque
  const getPosition = (event: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in event) {
        return {
            x: event.touches[0].clientX - rect.left,
            y: event.touches[0].clientY - rect.top,
        };
    }
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    };
  };

  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    const context = contextRef.current;
    if (!context) return;
    const { x, y } = getPosition(event);
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
    setLastClickPos({x, y}); // Guarda a última posição para a inserção de símbolos
  };

  const finishDrawing = () => {
    const context = contextRef.current;
    if (!context) return;
    context.closePath();
    setIsDrawing(false);
  };

  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const context = contextRef.current;
    if (!context) return;
    const { x, y } = getPosition(event);
    context.lineTo(x, y);
    context.stroke();
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleInsertSymbol = (symbol: string) => {
    const context = contextRef.current;
    if (!context) return;

    // Usa a última posição de clique ou o centro do canvas como fallback
    const position = lastClickPos || { x: context.canvas.width / 2, y: context.canvas.height / 2 };
    
    context.font = `${brushSize * 8}px sans-serif`;
    context.fillStyle = theme === 'dark' ? '#FFFFFF' : '#000000';
    context.fillText(symbol, position.x, position.y);
  };
  
  const mathSymbols = ['√', 'π', 'Σ', '∫', '±', '≠', '≤', '≥', 'ƒ(x)'];

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Tela de Desenho</CardTitle>
        <CardDescription>
          Use este espaço para desenhar, anotar e inserir símbolos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Barra de Ferramentas */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 items-center mb-4 p-2 border rounded-lg bg-muted/50">
          <div className="flex items-center gap-2">
            <label htmlFor="brushColor" className="text-sm font-medium">Cor:</label>
            <Input
              id="brushColor"
              type="color"
              value={brushColor}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBrushColor(e.target.value)} // Corrigido: Adicionado tipo ao evento
              className="w-10 h-8 p-0.5"
            />
          </div>
          <div className="flex items-center gap-2 flex-1 min-w-[120px]">
            <label htmlFor="brushSize" className="text-sm font-medium">Tamanho:</label>
            <Slider
              id="brushSize"
              min={1}
              max={20}
              step={1}
              value={[brushSize]}
              onValueChange={(value) => setBrushSize(value[0])}
              className="w-full"
            />
          </div>
           <Button variant="outline" size="sm" onClick={clearCanvas}>
            <Eraser className="h-4 w-4 mr-2" />
            Limpar
          </Button>
        </div>
        
         <div className="flex flex-wrap gap-2 items-center mb-4 p-2 border rounded-lg">
             <span className="text-sm font-medium mr-2">Símbolos:</span>
             {mathSymbols.map(symbol => (
                 <Button key={symbol} variant="secondary" size="sm" onClick={() => handleInsertSymbol(symbol)}>
                     {symbol}
                 </Button>
             ))}
         </div>

        {/* Tela de Desenho */}
        <div className="relative w-full h-[400px] border rounded-md overflow-hidden bg-white dark:bg-gray-800">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseUp={finishDrawing}
              onMouseLeave={finishDrawing} // Para o desenho se o rato sair do canvas
              onMouseMove={draw}
              onTouchStart={startDrawing}
              onTouchEnd={finishDrawing}
              onTouchMove={draw}
              className="absolute top-0 left-0 w-full h-full cursor-crosshair"
              onClick={(e) => setLastClickPos({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})}
            />
        </div>
      </CardContent>
    </Card>
  );
}

