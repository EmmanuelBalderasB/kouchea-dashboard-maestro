import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold">Escuela</h1>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Panel de maestro</h2>
          <p className="text-muted-foreground">Bienvenidx, Jose Luis!</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          <Card>
            <CardHeader>
              <CardTitle>Estudiantes</CardTitle>
              <CardDescription className="text-3xl font-bold text-foreground">25</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/estudiantes">Ver estudiantes</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tareas</CardTitle>
              <CardDescription className="text-3xl font-bold text-foreground">9</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/tareas">Gestionar tareas</Link>
              </Button>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
              <CardDescription className="text-3xl font-bold text-foreground">1°A</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/estadisticas">Ver estadísticas</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
