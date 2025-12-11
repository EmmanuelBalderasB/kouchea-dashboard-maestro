"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { X } from "lucide-react"

const tasks = [
  { leccion: "Lección 1", estado: "no iniciado", asignacion: "17/11/2025", entrega: "17/11/2025", completado: 0 },
  { leccion: "Lección 2", estado: "completo", asignacion: "19/11/2025", entrega: "19/11/2025", completado: 100 },
  { leccion: "Lección 3", estado: "no iniciado", asignacion: "06/12/2025", entrega: "12/12/2025", completado: 0 },
  { leccion: "Lección 4", estado: "en proceso", asignacion: "01/11/2025", entrega: "10/12/2025", completado: 45 },
  { leccion: "Lección 5", estado: "en proceso", asignacion: "27/11/2025", entrega: "08/12/2025", completado: 60 },
  { leccion: "Lección 6", estado: "completo", asignacion: "02/11/2025", entrega: "02/11/2025", completado: 100 },
  { leccion: "Lección 7", estado: "completo", asignacion: "10/11/2025", entrega: "09/11/2025", completado: 100 },
  { leccion: "Lección 8", estado: "en proceso", asignacion: "22/11/2025", entrega: "26/11/2025", completado: 30 },
  { leccion: "Lección 9", estado: "no iniciado", asignacion: "06/12/2025", entrega: "16/12/2025", completado: 0 },
]

function getStatusBadge(estado: string) {
  switch (estado) {
    case "completo":
      return <Badge variant="default">Completo</Badge>
    case "en proceso":
      return <Badge variant="secondary">En proceso</Badge>
    case "no iniciado":
      return <Badge variant="outline">No iniciado</Badge>
    default:
      return <Badge variant="outline">{estado}</Badge>
  }
}

export default function TareasPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<(typeof tasks)[0] | null>(null)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleEditClick = (task: (typeof tasks)[0]) => {
    setSelectedTask(task)
    setIsEditDialogOpen(true)
  }

  const handleViewClick = (task: (typeof tasks)[0]) => {
    setSelectedTask(task)
    setIsViewDialogOpen(true)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(tasks.map((_, index) => index))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (index: number, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, index])
    } else {
      setSelectedRows(selectedRows.filter((i) => i !== index))
    }
  }

  const filteredTasks = tasks.filter((task) => task.leccion.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="text-xl font-semibold hover:underline">
            Escuela
          </Link>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Gestión de tareas</h2>
          <p className="text-muted-foreground">Crea y administra tareas para tus grupos</p>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold">Mis tareas</h3>
            <div className="w-64">
              <Input type="search" placeholder="Buscar tareas..." onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div className="flex gap-2">
            {selectedRows.length > 0 && selectedRows.length < 2 && (
              <Button variant="destructive" size="icon" className="w-fit px-2">
                <X className="h-4 w-fit" />
                Eliminar tarea
              </Button>
            )}
            {selectedRows.length > 1 && (
              <Button variant="destructive" size="icon" className="w-fit px-2">
                <X className="h-4 w-fit" />
                Eliminar tareas
              </Button>
            )}
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>Crear tarea</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <div className="bg-[#BBDEFF] -mx-6 -mt-6 px-6 py-6 mb-4 flex items-center gap-4">
                  <div className="text-5xl">📋</div>
                  <div>
                    <DialogTitle className="text-xl">Asignación de tareas</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Crea y administra tareas para tus grupos
                    </DialogDescription>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="grupo">Grupo</Label>
                    <Select>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Selecciona un grupo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1a">1°A</SelectItem>
                        <SelectItem value="1b">1°B</SelectItem>
                        <SelectItem value="2a">2°A</SelectItem>
                        <SelectItem value="2b">2°B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nivel">Nivel</Label>
                    <Select>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Selecciona un nivel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7-8">7-8</SelectItem>
                        <SelectItem value="9-10">9-10</SelectItem>
                        <SelectItem value="11-12">11-12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tema">Tema</Label>
                    <Select>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Selecciona un tema" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="matematicas">Matemáticas</SelectItem>
                        <SelectItem value="ciencias">Ciencias</SelectItem>
                        <SelectItem value="historia">Historia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leccion">Lección de Kouchea</Label>
                    <Select>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Lección asignada" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="leccion1">Lección 1</SelectItem>
                        <SelectItem value="leccion2">Lección 2</SelectItem>
                        <SelectItem value="leccion3">Lección 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="asignacion">Fecha de asignación</Label>
                    <Input id="asignacion" type="date" className="bg-white" placeholder="mm / dd / yyyy" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="entrega">Fecha de entrega</Label>
                    <Input id="entrega" type="date" className="bg-white" placeholder="mm / dd / yyyy" />
                  </div>
                  <div className="space-y-3 col-span-2">
                    <Label>Acciones</Label>
                    <RadioGroup defaultValue="grupo">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="grupo" id="grupo" />
                        <Label htmlFor="grupo" className="font-normal cursor-pointer">
                          Asignar por grupo
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="individual" id="individual" />
                        <Label htmlFor="individual" className="font-normal cursor-pointer">
                          Asignar alumnos de manera individual
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setIsCreateDialogOpen(false)}>Crear tarea</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox checked={selectedRows.length === filteredTasks.length} onCheckedChange={handleSelectAll} />
                </TableHead>
                <TableHead>Lección</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha de asignación</TableHead>
                <TableHead>Fecha de entrega</TableHead>
                <TableHead>Estudiantes completado %</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(index)}
                      onCheckedChange={(checked) => handleSelectRow(index, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <button onClick={() => handleViewClick(task)} className="font-medium text-primary hover:underline">
                      {task.leccion}
                    </button>
                  </TableCell>
                  <TableCell>{getStatusBadge(task.estado)}</TableCell>
                  <TableCell>{task.asignacion}</TableCell>
                  <TableCell>{task.entrega}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={task.completado} className="w-24" />
                      <span className="text-sm text-muted-foreground">{task.completado}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditClick(task)}>
                        Editar
                      </Button>
                      <Button variant="ghost" size="sm">
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Información de la tarea</DialogTitle>
              <DialogDescription>Detalles completos de la tarea</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <Label className="text-muted-foreground">Lección</Label>
                <p className="text-lg font-medium">{selectedTask?.leccion}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Estado</Label>
                <div className="mt-1">{selectedTask && getStatusBadge(selectedTask.estado)}</div>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Progreso de estudiantes</Label>
                <div className="flex items-center gap-2">
                  <Progress value={selectedTask?.completado} className="w-32" />
                  <span className="text-sm">{selectedTask?.completado}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Fecha de asignación</Label>
                <p className="text-lg font-medium">{selectedTask?.asignacion}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Fecha de entrega</Label>
                <p className="text-lg font-medium">{selectedTask?.entrega}</p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsViewDialogOpen(false)}>Cerrar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <div className="bg-[#BBDEFF] -mx-6 -mt-6 px-6 py-6 mb-4 flex items-center gap-4">
              <div className="text-5xl">📋</div>
              <div>
                <DialogTitle className="text-xl">Editar asignación de tarea</DialogTitle>
                <DialogDescription className="text-gray-600">Actualiza la información de la tarea</DialogDescription>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-grupo">Grupo</Label>
                <Select>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Selecciona un grupo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1a">1°A</SelectItem>
                    <SelectItem value="1b">1°B</SelectItem>
                    <SelectItem value="2a">2°A</SelectItem>
                    <SelectItem value="2b">2°B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-nivel">Nivel</Label>
                <Select>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Selecciona un nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7-8">7-8</SelectItem>
                    <SelectItem value="9-10">9-10</SelectItem>
                    <SelectItem value="11-12">11-12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-tema">Tema</Label>
                <Select>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Selecciona un tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matematicas">Matemáticas</SelectItem>
                    <SelectItem value="ciencias">Ciencias</SelectItem>
                    <SelectItem value="historia">Historia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-leccion">Lección de Kouchea</Label>
                <Select>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Lección asignada" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leccion1">Lección 1</SelectItem>
                    <SelectItem value="leccion2">Lección 2</SelectItem>
                    <SelectItem value="leccion3">Lección 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-asignacion">Fecha de asignación</Label>
                <Input id="edit-asignacion" type="date" defaultValue={selectedTask?.asignacion} className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-entrega">Fecha de entrega</Label>
                <Input id="edit-entrega" type="date" defaultValue={selectedTask?.entrega} className="bg-white" />
              </div>
              <div className="space-y-3 col-span-2">
                <Label>Acciones</Label>
                <RadioGroup defaultValue="grupo">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="grupo" id="edit-grupo-radio" />
                    <Label htmlFor="edit-grupo-radio" className="font-normal cursor-pointer">
                      Asignar por grupo
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="edit-individual" />
                    <Label htmlFor="edit-individual" className="font-normal cursor-pointer">
                      Asignar alumnos de manera individual
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsEditDialogOpen(false)}>Guardar cambios</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">Lecciones: 25</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              {"<"}
            </Button>
            <Button variant="outline" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              4
            </Button>
            <Button variant="outline" size="sm">
              {">"}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Total página: 9</p>
        </div>

        <div className="mt-8">
          <Button asChild variant="outline">
            <Link href="/">← Volver al inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
