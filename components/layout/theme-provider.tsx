"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"

/**
 * Este componente atua como um wrapper para o ThemeProvider da biblioteca 'next-themes'.
 * Ao marcá-lo como "use client", garantimos que ele seja renderizado no lado do cliente,
 * o que é necessário para que ele possa detectar e alterar o tema do navegador.
 * * Ele é então usado no layout raiz (src/app/layout.tsx) para envolver toda a aplicação,
 * disponibilizando a funcionalidade de troca de tema para todos os componentes.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

