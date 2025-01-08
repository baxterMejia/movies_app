import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  private apiUrl = environment.apiMovies; //URL de la API
  private apiKey = environment.apiKey; //API Key de TMDB
  private bearerToken = environment.bearerToken; // Bearer token para autenticación

  constructor(private http: HttpClient) {}

  /**
   * Obtener el listado de películas populares
   */
  getMovies(page: number = 1): Observable<any> {
    const url = `${this.apiUrl}/movie/popular`;
    return this.http.get(url, {
      params: {
        api_key: this.apiKey,
        page: page.toString(),
      },
    });
  }

  /**
   * Buscar películas por nombre
   */
  searchMovies(query: string, page: number = 1): Observable<any> {
    const url = `${this.apiUrl}/search/movie`;
    return this.http.get(url, {
      params: {
        api_key: this.apiKey,
        query,
        page: page.toString(),
      },
    });
  }

  /**
   * Obtener detalles de una película por su ID
   */
  getMovieDetails(movieId: number): Observable<any> {
    const url = `${this.apiUrl}/movie/${movieId}`;
    return this.http.get(url, {
      params: {
        api_key: this.apiKey,
        append_to_response: "credits", // Incluye elenco y equipo de producción
      },
    });
  }

  /**
   * Crear un token de solicitud
   */
  createRequestToken(): Observable<any> {
    const url = `${this.apiUrl}/authentication/token/new`;
    return this.http.get(url, {
      params: {
        api_key: this.apiKey,
      },
    });
  }

  /**
   * Crear una sesión de usuario
   * Requiere el token de solicitud que se genera previamente
   */
  createSession(requestToken: string): Observable<any> {
    const url = `${this.apiUrl}/authentication/session/new`;
    return this.http.post(url, {
      api_key: this.apiKey,
      request_token: requestToken,
    });
  }

  /**
   * Guardar la calificación de una película
   * Requiere el ID de la película, el valor de la calificación (de 1 a 10)
   * y la sesión de usuario con su ID de sesión
   */
  rateMovie(
    movieId: number,
    sessionId: string,
    rating: number
  ): Observable<any> {
    const url = `${this.apiUrl}/movie/${movieId}/rating`;
    return this.http.post(url, {
      api_key: this.apiKey,
      session_id: sessionId,
      value: rating, // Rating entre 1 y 10
    });
  }

  // Crear sesión de invitado
  createGuestSession(): Observable<any> {
    const url = `${this.apiUrl}/authentication/guest_session/new`;

    // Configurar cabeceras para incluir el Bearer token
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${this.bearerToken}`,
    });

    // Enviar la solicitud POST con el Bearer token en los headers
    return this.http.post(url, { api_key: this.apiKey }, { headers });
  }

  // Calificar película como invitado
  rateMovieAsGuest(
    guestSessionId: string,
    movieId: number,
    rating: number
  ): Observable<any> {
    const url = `${this.apiUrl}/movie/${movieId}/rating`;

    // Configurar cabeceras para incluir el Bearer token
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${this.bearerToken}`,
    });

    // Enviar la solicitud POST con el Bearer token en los headers
    return this.http.post(
      url,
      {
        api_key: this.apiKey,
        guest_session_id: guestSessionId,
        value: rating,
      },
      { headers }
    );
  }
}
