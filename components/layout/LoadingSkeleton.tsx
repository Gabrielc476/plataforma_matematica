import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Um componente de placeholder que exibe uma versão simplificada da UI
 * enquanto o conteúdo principal está sendo carregado no cliente.
 * Isso ajuda a evitar erros de hidratação.
 */
export function LoadingSkeleton() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
        {/* Skeleton da Sidebar */}
        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-9 w-full mt-2" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        </aside>

        {/* Skeleton do Conteúdo Principal */}
        <main>
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <Skeleton className="h-7 w-3/4" />
                  <Skeleton className="h-4 w-1/2 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-4/5 mt-2" />
                </CardContent>
              </Card>
            </div>
            <aside>
              <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
