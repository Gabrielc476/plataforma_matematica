"use client";

import { Sidebar } from "@/components/sidebar/Sidebar";
import { MainContent } from "@/components/core/MainContent";
import { Header } from "./Header";

/**
 * MainLayout é o componente que define a estrutura visual principal da aplicação.
 * Ele organiza a página em três partes principais: Header, Sidebar e MainContent.
 *
 * - Header: Fixo no topo da página.
 * - Conteúdo Principal: Um grid que se adapta ao tamanho da tela.
 * - Em telas grandes (lg), exibe a Sidebar à esquerda e o MainContent à direita.
 * - Em telas menores, o layout se torna uma única coluna, com a Sidebar acima do MainContent.
 */
export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          {/* A Sidebar é o menu de navegação e status do usuário. */}
          <aside>
            <Sidebar />
          </aside>

          {/* O MainContent é onde as lições e os painéis interativos são renderizados. */}
          <main>
            <MainContent />
          </main>
        </div>
      </div>
    </div>
  );
}
