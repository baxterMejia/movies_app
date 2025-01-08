import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { TaskDTO } from "./Models/TaskDTO";
import { ReporteTareasPendientesDTO } from "./Models/ReporteTareasPendientesDTO";
import { EstadoDTO } from "./Models/EstadoDTO";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private apiUrl = environment.apiGateway;

  constructor(private http: HttpClient) {}

  // Método para agregar una nueva tarea
  addTask(requestDto: TaskDTO): Observable<TaskDTO> {
    const url = `${this.apiUrl}/Task/AddTask`;
    return this.http.post<TaskDTO>(url, requestDto).pipe(
      map((response) => response),
      catchError((error) => throwError(error))
    );
  }

  // Método para obtener todas las tareas
  getAllTasks(): Observable<TaskDTO[]> {
    const url = `${this.apiUrl}/Task/GetAllTasks`;
    return this.http.get<TaskDTO[]>(url).pipe(
      map((response) => response),
      catchError((error) => throwError(error))
    );
  }

  // Método para obtener una tarea por su ID
  getTaskById(id: number): Observable<TaskDTO> {
    const url = `${this.apiUrl}/Task/GetTaskById/${id}`;
    return this.http.get<TaskDTO>(url).pipe(
      map((response) => response),
      catchError((error) => throwError(error))
    );
  }

  // Método para actualizar una tarea
  updateTask(id: number, requestDto: TaskDTO): Observable<TaskDTO> {
    const url = `${this.apiUrl}/Task/UpdateTask/${id}`;
    return this.http.put<TaskDTO>(url, requestDto).pipe(
      map((response) => response),
      catchError((error) => throwError(error))
    );
  }

  // Método para eliminar una tarea
  deleteTask(id: number): Observable<void> {
    const url = `${this.apiUrl}/Task/DeleteTask/${id}`;
    return this.http
      .delete<void>(url)
      .pipe(catchError((error) => throwError(error)));
  }

  // Método para obtener todas las tareas
  getAllTasksPending(): Observable<ReporteTareasPendientesDTO[]> {
    const url = `${this.apiUrl}/Task/GetTareasPendientesPorEmpleado`;
    return this.http.get<ReporteTareasPendientesDTO[]>(url).pipe(
      map((response) => response),
      catchError((error) => throwError(error))
    );
  }

  // Metodo para consultar estado de tareas
  getAllStatus(): Observable<EstadoDTO[]> {
    const url = `${this.apiUrl}/Estado/GetAllEstados`;
    return this.http.get<EstadoDTO[]>(url).pipe(
      map((response) => response),
      catchError((error) => throwError(error))
    );
  }
}
