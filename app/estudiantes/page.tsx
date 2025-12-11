"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

const students = [
  {
    nombre: "Juan",
    apellido: "Hernández",
    usuario: "jhenandez",
    contraseña: "sasd@qef21",
    matricula: "000001",
    grupo: "1°A",
    nivel: "7-8",
  },
  {
    nombre: "María",
    apellido: "López",
    usuario: "mlopez",
    contraseña: "sasd@qef21",
    matricula: "000002",
    grupo: "1°A",
    nivel: "7-8",
  },
  {
    nombre: "José",
    apellido: "Martínez",
    usuario: "jmartinez",
    contraseña: "sasd@qef21",
    matricula: "000003",
    grupo: "1°A",
    nivel: "7-8",
  },
  {
    nombre: "Ana",
    apellido: "García",
    usuario: "agarcia",
    contraseña: "sasd@qef21",
    matricula: "000004",
    grupo: "1°A",
    nivel: "7-8",
  },
  {
    nombre: "Carlos",
    apellido: "Rodríguez",
    usuario: "crodriguez",
    contraseña: "sasd@qef21",
    matricula: "000005",
    grupo: "1°A",
    nivel: "7-8",
  },
  {
    nombre: "Luis",
    apellido: "González",
    usuario: "lgonzalez",
    contraseña: "sasd@qef21",
    matricula: "000006",
    grupo: "1°A",
    nivel: "7-8",
  },
  {
    nombre: "Carmen",
    apellido: "Sánchez",
    usuario: "csanchez",
    contraseña: "sasd@qef21",
    matricula: "000007",
    grupo: "1°A",
    nivel: "7-8",
  },
]

export default function EstudiantesPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<(typeof students)[0] | null>(null)
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const handleEditClick = (student: (typeof students)[0]) => {
    setSelectedStudent(student)
    setIsEditDialogOpen(true)
  }

  const handleViewClick = (student: (typeof students)[0]) => {
    setSelectedStudent(student)
    setIsViewDialogOpen(true)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(students.map((s) => s.matricula))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (matricula: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, matricula])
    } else {
      setSelectedRows(selectedRows.filter((m) => m !== matricula))
    }
  }

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
          <h2 className="text-2xl font-bold mb-2">Gestión de estudiantes</h2>
          <p className="text-muted-foreground">Gestiona los estudiantes de este maestro</p>
        </div>

        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-64">
            <Input type="search" placeholder="Buscar estudiantes..." />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Estudiantes liberados</Button>
            <Button variant="outline">Asignar tarea</Button>
            <Button variant="outline">Importar CSV</Button>
            {selectedRows.length > 0 && selectedRows.length < 2 && (
              <Button variant="destructive" size="icon" className="w-fit px-2">
                <X className="h-4 w-fit" />
                Eliminar estudiante
              </Button>
            )}
            {selectedRows.length > 1 && (
              <Button variant="destructive" size="icon" className="w-fit px-2">
                <X className="h-4 w-fit" />
                Eliminar estudiantes
              </Button>
            )}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>+ Agregar estudiante</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <div className="bg-[#BBDEFF] -mx-6 -mt-6 px-6 py-6 mb-4 flex items-center gap-4">
                  <div className="text-5xl">👨‍🎓</div>
                  <div>
                    <DialogTitle className="text-xl">Nuevo estudiante</DialogTitle>
                    <DialogDescription className="text-gray-600">Registra a un nuevo estudiante</DialogDescription>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input id="nombre" placeholder="Nombre" className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input id="apellido" placeholder="Apellido" className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="usuario">Usuario</Label>
                    <Input id="usuario" placeholder="Usuario" className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contraseña">Contraseña</Label>
                    <Input id="contraseña" type="password" placeholder="Contraseña" className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nivel">Nivel</Label>
                    <Select>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Nivel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7-8">7-8</SelectItem>
                        <SelectItem value="9-10">9-10</SelectItem>
                        <SelectItem value="11-12">11-12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grupo">Grupo</Label>
                    <Select>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Grupo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1a">1°A</SelectItem>
                        <SelectItem value="1b">1°B</SelectItem>
                        <SelectItem value="2a">2°A</SelectItem>
                        <SelectItem value="2b">2°B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="matricula">Matrícula</Label>
                    <Input id="matricula" placeholder="e.j 0001" className="bg-white w-1/2" />
                  </div>
                </div>
                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>Crear estudiante</Button>
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
                  <Checkbox checked={selectedRows.length === students.length} onCheckedChange={handleSelectAll} />
                </TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Apellido</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Contraseña</TableHead>
                <TableHead>Matrícula</TableHead>
                <TableHead>Grupo</TableHead>
                <TableHead>Nivel</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.matricula}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(student.matricula)}
                      onCheckedChange={(checked) => handleSelectRow(student.matricula, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <button onClick={() => handleViewClick(student)} className="font-medium text-black hover:underline">
                      {student.nombre}
                    </button>
                  </TableCell>
                  <TableCell>{student.apellido}</TableCell>
                  <TableCell>{student.usuario}</TableCell>
                  <TableCell>{student.contraseña}</TableCell>
                  <TableCell>{student.matricula}</TableCell>
                  <TableCell>{student.grupo}</TableCell>
                  <TableCell>{student.nivel}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditClick(student)}>
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
              <DialogTitle>Información del estudiante</DialogTitle>
              <DialogDescription>Detalles completos del estudiante</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Nombre</Label>
                <p className="text-lg font-medium">{selectedStudent?.nombre}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Apellido</Label>
                <p className="text-lg font-medium">{selectedStudent?.apellido}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Usuario</Label>
                <p className="text-lg font-medium">{selectedStudent?.usuario}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Contraseña</Label>
                <p className="text-lg font-medium">{selectedStudent?.contraseña}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Matrícula</Label>
                <p className="text-lg font-medium">{selectedStudent?.matricula}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Grupo</Label>
                <p className="text-lg font-medium">{selectedStudent?.grupo}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Nivel</Label>
                <p className="text-lg font-medium">{selectedStudent?.nivel}</p>
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
              <div className="text-5xl">👨‍🎓</div>
              <div>
                <DialogTitle className="text-xl">Editar estudiante</DialogTitle>
                <DialogDescription className="text-gray-600">Actualiza la información del estudiante</DialogDescription>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-nombre">Nombre</Label>
                <Input id="edit-nombre" defaultValue={selectedStudent?.nombre} className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-apellido">Apellido</Label>
                <Input id="edit-apellido" defaultValue={selectedStudent?.apellido} className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-usuario">Usuario</Label>
                <Input id="edit-usuario" defaultValue={selectedStudent?.usuario} className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-contraseña">Contraseña</Label>
                <Input
                  id="edit-contraseña"
                  type="password"
                  defaultValue={selectedStudent?.contraseña}
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-nivel">Nivel</Label>
                <Select defaultValue={selectedStudent?.nivel}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7-8">7-8</SelectItem>
                    <SelectItem value="9-10">9-10</SelectItem>
                    <SelectItem value="11-12">11-12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-grupo">Grupo</Label>
                <Select defaultValue={selectedStudent?.grupo}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1a">1°A</SelectItem>
                    <SelectItem value="1b">1°B</SelectItem>
                    <SelectItem value="2a">2°A</SelectItem>
                    <SelectItem value="2b">2°B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-matricula">Matrícula</Label>
                <Input id="edit-matricula" defaultValue={selectedStudent?.matricula} className="bg-white w-1/2" />
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
          <p className="text-sm text-muted-foreground">Estudiantes: 25</p>
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
