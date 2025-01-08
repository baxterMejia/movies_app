import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiGateway; // Reemplaza con la URL de tu API Gateway

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    // Codificar la contraseña a Base64
    const base64Pass = btoa(password);

    const url = `${this.apiUrl}/Login/LoginValidate`;
    return this.http.post<LoginResponse>(url, { username, pass: base64Pass })
      .pipe(
        map(response => {
          // Almacenar el token en localStorage si existe en la respuesta
          if (response && response.token) {
            localStorage.setItem('token', response.token);
          }
          return response;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  logout(username: string): Observable<any> {
    const url = `${this.apiUrl}/Login/Logout`;
    return this.http.post<any>(url, { username })
      .pipe(
        map(response => {
          // Eliminar el token del localStorage al hacer logout
          localStorage.removeItem('token');
          return response;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }
}
