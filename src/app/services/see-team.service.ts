// src/app/services/team.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeeTeamService {
  private apiUrl = 'http://localhost/FindMatch-backend/PHP/controller/TeamController.php';
  private apiSolicitudes = 'http://localhost/FindMatch-backend/PHP/controller/TeamRequestsController.php';

  constructor(private http: HttpClient) { }

  getMiembrosDelEquipo(teamId: number): Observable<any> {
    const body = {
      action: 'getTeamDetails',
      team_id: teamId
    };

    return this.http.post<any>(this.apiUrl, body);
  }

  // Obtener solicitudes mediante GET con parámetro en query string
  obtenerSolicitudesDeEquipo(teamId: number): Observable<any> {
    return this.http.get<any>(`${this.apiSolicitudes}?team_id=${teamId}`);
  }

  // Aceptar solicitud usando POST con action 'accept'
  aceptarSolicitud(userId: string, teamId: number): Observable<any> {
    return this.http.post<any>(this.apiSolicitudes, {
      action: 'accept',
      user_id: userId,
      team_id: teamId
    });
  }

  // Rechazar solicitud usando POST con action 'reject'
  rechazarSolicitud(userId: string, teamId: number): Observable<any> {
    return this.http.post<any>(this.apiSolicitudes, {
      action: 'reject',
      user_id: userId,
      team_id: teamId
    });
  }

  eliminarJugador(userId: string, teamId: number): Observable<any> {
    return this.http.post<any>(this.apiSolicitudes, {
      action: 'removePlayer',
      user_id: userId,
      team_id: teamId
    });
  }
}
