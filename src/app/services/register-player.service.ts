import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterPlayerService {

  private apiUrl = 'http://localhost/FindMatch-backend/PHP/controller/PlayerController.php';

  constructor(private http: HttpClient) {}

  registerPlayer(playerData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, JSON.stringify(playerData), { headers })
      .pipe(
        catchError(error => {
          console.error('Error en el registro del jugador:', error);
          return throwError('Ocurrió un error al registrar al jugador, por favor intenta de nuevo.');
        })
      );
  }
}
