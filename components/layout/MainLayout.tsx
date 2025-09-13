"use client";

import * as React from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { MainContent } from "@/components/core/MainContent";
import { Header } from "./Header";
import { LoadingSkeleton } from "./LoadingSkeleton";

/**
 * MainLayout é o componente que define a estrutura visual principal da aplicação.
 * Utiliza um estado 'isClient' para renderizar um esqueleto de carregamento no servidor
 * e o conteúdo completo apenas no cliente, evitando erros de hidratação.
 */
export default function MainLayout() {
  const [isClient, setIsClient] = React.useState(false);

  // useEffect só é executado no cliente. Após a primeira renderização,
  // definimos isClient como true, o que aciona uma nova renderização
  // com o conteúdo que depende do estado do cliente (localStorage).
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      
      {/* Renderiza o esqueleto no servidor e na primeira renderização do cliente */}
      {!isClient && <LoadingSkeleton />}

      {/* Renderiza o conteúdo real apenas no cliente, após a hidratação */}
      {isClient && (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
            <aside>
              <Sidebar />
            </aside>
            <main>
              <MainContent />
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

