export interface TaskDTO {
  idTarea: number;          // Identificador único de la tarea
  titulo: string;           // Título de la tarea
  descripcion: string;      // Descripción de la tarea
  empleadoNombre: string;   // Nombre del empleado asignado a la tarea
  estadoNombre: string;     // Nombre del estado de la tarea (Pendiente, En progreso, Completada, etc.)
  fechaLimite: string;      // Fecha límite de la tarea
  idEmpleado: number;       // ID del empleado asignado
  idEstado: number;         // ID del estado de la tarea
}
