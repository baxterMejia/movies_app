import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EmpleadoDTO } from './Models/EmpleadoDTO';  // Asegúrate de que tengas el modelo EmpleadoDTO definido.

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = environment.apiGateway; // Reemplaza con la URL de tu API Gateway

  constructor(private http: HttpClient) { }

  // Método para agregar un nuevo empleado
  addEmployee(employeeDto: EmpleadoDTO): Observable<EmpleadoDTO> {
    const url = `${this.apiUrl}/Employee/AddEmployee`;
    return this.http.post<EmpleadoDTO>(url, employeeDto)
      .pipe(
        map(response => response),
        catchError(error => throwError(error))
      );
  }

  // Método para obtener todos los empleados
  getAllEmployees(): Observable<EmpleadoDTO[]> {
    const url = `${this.apiUrl}/Employee/GetAllEmployees`;
    return this.http.get<EmpleadoDTO[]>(url)
      .pipe(
        map(response => response),
        catchError(error => throwError(error))
      );
  }

  // Método para obtener un empleado por su ID
  getEmployeeById(id: number): Observable<EmpleadoDTO> {
    const url = `${this.apiUrl}/Employee/GetEmployeeById/${id}`;
    return this.http.get<EmpleadoDTO>(url)
      .pipe(
        map(response => response),
        catchError(error => throwError(error))
      );
  }

  // Método para actualizar un empleado
  updateEmployee(id: number, employeeDto: EmpleadoDTO): Observable<EmpleadoDTO> {
    const url = `${this.apiUrl}/Employee/UpdateEmployee/${id}`;
    return this.http.put<EmpleadoDTO>(url, employeeDto)
      .pipe(
        map(response => response),
        catchError(error => throwError(error))
      );
  }

  // Método para eliminar un empleado
  deleteEmployee(id: number): Observable<void> {
    const url = `${this.apiUrl}/Employee/DeleteEmployee/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(error => throwError(error))
      );
  }
}
