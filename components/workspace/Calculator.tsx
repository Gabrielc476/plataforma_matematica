"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Divide, X, Minus, Plus, Percent, Delete } from "lucide-react";

type Operator = "+" | "-" | "*" | "/";

// Estado da calculadora
interface CalculatorState {
  displayValue: string; // Valor principal no visor (atual ou resultado)
  expression: string; // Expressão completa a ser mostrada
  operator: Operator | null; // Último operador pressionado
  waitingForOperand: boolean; // Flag para saber se o próximo dígito deve iniciar um novo número
  firstOperand: number | null; // Primeiro operando para cálculos
}

const initialState: CalculatorState = {
  displayValue: "0",
  expression: "",
  operator: null,
  waitingForOperand: false,
  firstOperand: null,
};

/**
 * Componente de Calculadora funcional com operações básicas,
 * porcentagem e um visor duplo para a expressão completa.
 */
export function Calculator() {
  const [state, setState] = React.useState<CalculatorState>(initialState);

  const handleDigitClick = (digit: string) => {
    if (state.waitingForOperand) {
      setState((prevState) => ({
        ...prevState,
        displayValue: digit,
        waitingForOperand: false,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        displayValue:
          prevState.displayValue === "0" ? digit : prevState.displayValue + digit,
      }));
    }
  };

  const handleDecimalClick = () => {
    if (!state.displayValue.includes(".")) {
      setState((prevState) => ({
        ...prevState,
        displayValue: prevState.displayValue + ".",
      }));
    }
  };

  const handleOperatorClick = (nextOperator: Operator) => {
    const inputValue = parseFloat(state.displayValue);

    if (state.firstOperand !== null && state.operator && !state.waitingForOperand) {
      const result = calculate(state.firstOperand, inputValue, state.operator);
      const resultStr = String(result);
      setState({
        displayValue: resultStr,
        expression: `${resultStr} ${nextOperator}`,
        operator: nextOperator,
        waitingForOperand: true,
        firstOperand: result,
      });
    } else {
      setState({
        ...state,
        expression: `${state.displayValue} ${nextOperator}`,
        operator: nextOperator,
        waitingForOperand: true,
        firstOperand: inputValue,
      });
    }
  };

  const handleEqualsClick = () => {
    if (!state.operator || state.firstOperand === null) return;

    const secondOperand = parseFloat(state.displayValue);
    const result = calculate(state.firstOperand, secondOperand, state.operator);
    const resultStr = String(result);

    setState({
      ...initialState,
      displayValue: resultStr,
      expression: `${state.firstOperand} ${state.operator} ${secondOperand} =`,
    });
  };

  const handleClear = () => {
    setState(initialState);
  };
  
  const handleBackspace = () => {
    if (state.waitingForOperand) return;
    if (state.displayValue.length > 1) {
      setState(prevState => ({ ...prevState, displayValue: prevState.displayValue.slice(0, -1) }));
    } else {
      setState(prevState => ({ ...prevState, displayValue: "0" }));
    }
  };

  const handleToggleSign = () => {
    setState(prevState => ({
      ...prevState,
      displayValue: String(parseFloat(prevState.displayValue) * -1),
    }));
  };

  const handlePercentClick = () => {
    const currentValue = parseFloat(state.displayValue);
    if (state.firstOperand !== null && state.operator) {
        // Comportamento para A + B % => A + (A * B/100)
        const percentValue = (state.firstOperand * currentValue) / 100;
        const result = calculate(state.firstOperand, percentValue, state.operator);
        const resultStr = String(result);
         setState({
            ...initialState,
            displayValue: resultStr,
            expression: `${state.firstOperand} ${state.operator} ${percentValue} =`,
        });
    } else {
        // Comportamento simples: B % => B/100
        const result = currentValue / 100;
        setState(prevState => ({
            ...prevState,
            displayValue: String(result)
        }));
    }
  };

  const calculate = (
    firstOperand: number,
    secondOperand: number,
    operator: Operator
  ): number => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  return (
    <Card className="mt-4 w-full max-w-xs mx-auto shadow-lg">
      <CardContent className="p-4">
        {/* Visor */}
        <div className="bg-muted rounded-md p-4 mb-4 text-right">
            <div className="text-muted-foreground text-sm min-h-[20px] break-words">
                {state.expression || " "}
            </div>
            <div className="text-4xl font-mono break-all">
                {state.displayValue}
            </div>
        </div>

        {/* Botões */}
        <div className="grid grid-cols-4 gap-2">
            <Button variant="secondary" className="h-16 text-xl" onClick={handleClear}>AC</Button>
            <Button variant="secondary" className="h-16 text-xl" onClick={handleToggleSign}>+/-</Button>
            <Button variant="secondary" className="h-16 text-xl" onClick={handlePercentClick}><Percent /></Button>
            <Button variant="destructive" className="h-16 text-xl" onClick={() => handleOperatorClick("/")}><Divide /></Button>

            <Button variant="outline" className="h-16 text-xl" onClick={() => handleDigitClick("7")}>7</Button>
            <Button variant="outline" className="h-16 text-xl" onClick={() => handleDigitClick("8")}>8</Button>
            <Button variant="outline" className="h-16 text-xl" onClick={() => handleDigitClick("9")}>9</Button>
            <Button variant="destructive" className="h-16 text-xl" onClick={() => handleOperatorClick("*")}><X /></Button>

            <Button variant="outline" className="h-16 text-xl" onClick={() => handleDigitClick("4")}>4</Button>
            <Button variant="outline" className="h-16 text-xl" onClick={() => handleDigitClick("5")}>5</Button>
            <Button variant="outline" className="h-16 text-xl" onClick={() => handleDigitClick("6")}>6</Button>
            <Button variant="destructive" className="h-16 text-xl" onClick={() => handleOperatorClick("-")}><Minus /></Button>

            <Button variant="outline" className="h-16 text-xl" onClick={() => handleDigitClick("1")}>1</Button>
            <Button variant="outline" className="h-16 text-xl" onClick={() => handleDigitClick("2")}>2</Button>
            <Button variant="outline" className="h-16 text-xl" onClick={() => handleDigitClick("3")}>3</Button>
            <Button variant="destructive" className="h-16 text-xl" onClick={() => handleOperatorClick("+")}><Plus /></Button>
            
            <Button variant="outline" className="h-16 text-xl" onClick={handleBackspace}><Delete /></Button>
            <Button variant="outline" className="h-16 text-xl" onClick={() => handleDigitClick("0")}>0</Button>
            <Button variant="outline" className="h-16 text-xl" onClick={handleDecimalClick}>.</Button>
            <Button className="h-16 text-xl" onClick={handleEqualsClick}>=</Button>
        </div>
      </CardContent>
    </Card>
  );
}

