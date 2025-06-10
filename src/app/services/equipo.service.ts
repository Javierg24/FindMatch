import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Team {
  TEAM_ID?: number; // Opcional si es autoincrement
  TEAM_NAME: string;
  TEAM_ADDRESS?: string;
  CREATED?: string;
  TEAM_TYPE: number;
  CAPTAIN: string;
  LEAGUE_ID?: number;
  TOURNAMENT_ID?: number;
  PICTURE?: string; // base64 o URL
}

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  private apiUrl = 'http://localhost/FindMatch-backend/PHP/controller/TeamController.php';

  constructor(private http: HttpClient) { }

  getTeamsWhereUserIsCaptain(userId: string): Observable<Team[]> {
    return this.http.post<Team[]>(this.apiUrl, { user_id: userId, only_captain: true });
  }

  getTeamsByUserId(userId: string): Observable<Team[]> {
    return this.http.post<Team[]>(this.apiUrl, { user_id: userId });
  }


  createTeam(team: Team): Observable<any> {
    const payload = {
      action: 'create',
      data: team
    };
    return this.http.post<any>(this.apiUrl, payload);
  }
}
