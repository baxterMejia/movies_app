import { TaskDTO } from "./TaskDTO";

export interface ReporteTareasPendientesDTO {
  empleadoNombre: string;   // Nombre del empleado (tipo string)
  tareas: TaskDTO[];
}
