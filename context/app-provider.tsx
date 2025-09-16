"use client";

import * as React from "react";
import { topics } from "@/data/topics";

// 1. Definir a "forma" do nosso estado global
interface AppState {
  currentTopicKey: keyof typeof topics;
  currentLessonIndex: number;
  isPracticing: boolean;
  xp: number;
  level: number;
  streak: number;
  consoleContent: { title: string; lines: string[] }; // Adicionado: para o conteúdo do console
}

// 2. Definir as ações que podem modificar o estado
type AppAction =
  | { type: "SET_TOPIC"; payload: keyof typeof topics }
  | { type: "SET_LESSON_INDEX"; payload: number }
  | { type: "ADD_XP"; payload: { amount: number; reason: string } }
  | { type: "SET_PRACTICING"; payload: boolean }
  | { type: "SET_CONSOLE_CONTENT"; payload: { title: string; lines: string[] } } // Adicionado
  | { type: "CLEAR_CONSOLE" }; // Adicionado

// 3. Definir o estado inicial da aplicação
const initialState: AppState = {
  currentTopicKey: "arithmetic",
  currentLessonIndex: 0,
  isPracticing: false,
  xp: 0,
  level: 1,
  streak: 0,
  consoleContent: { title: "Console", lines: ["Respostas e passos aparecerão aqui."] }, // Adicionado
};

// 4. Criar o reducer - uma função que executa as ações
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_TOPIC":
      return {
        ...state,
        currentTopicKey: action.payload,
        currentLessonIndex: 0,
        isPracticing: false,
      };
    case "SET_LESSON_INDEX": {
        const topic = topics[state.currentTopicKey];
        const newIndex = action.payload;
        if (newIndex >= 0 && newIndex < topic.lessons.length) {
            return { ...state, currentLessonIndex: newIndex };
        }
        return state;
    }
    case "SET_PRACTICING":
        return {
            ...state,
            isPracticing: action.payload,
        };
    case "ADD_XP": {
      const newXp = state.xp + action.payload.amount;
      const nextLevelXp = state.level * 50;
      if (newXp >= nextLevelXp) {
        return {
          ...state,
          level: state.level + 1,
          xp: newXp - nextLevelXp,
          streak: state.streak + 1,
        };
      }
      return { ...state, xp: newXp, streak: state.streak + 1 };
    }
    case "SET_CONSOLE_CONTENT": // Adicionado
      return { ...state, consoleContent: action.payload };
    case "CLEAR_CONSOLE": // Adicionado
      return { ...state, consoleContent: { title: "Console", lines: ["Limpo."] } };
    default:
      return state;
  }
}

// 5. Criar o Context e o Provider
const AppContext = React.createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

// Função para inicializar o estado a partir do localStorage
const initializer = (initialValue: AppState): AppState => {
    if (typeof window === "undefined") {
        return initialValue;
    }
    try {
        const storedState = localStorage.getItem("math-app-state");
        if (storedState) {
            // Garante que o estado do console não é persistido
            return { ...JSON.parse(storedState), consoleContent: initialValue.consoleContent };
        }
        return initialValue;
    } catch (error) {
        console.error("Error parsing state from localStorage", error);
        return initialValue;
    }
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(appReducer, initialState, initializer);

  React.useEffect(() => {
    try {
        // Exclui o consoleContent ao salvar
        const { consoleContent, ...stateToSave } = state;
        localStorage.setItem("math-app-state", JSON.stringify(stateToSave));
    } catch (error) {
        console.error("Error saving state to localStorage", error);
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// 6. Criar um hook customizado para usar o context facilmente
export function useAppContext() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}

