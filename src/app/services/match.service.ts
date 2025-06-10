import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Match {
  MATCH_ID: number;
  MATCH_DATE_TIME: string;
  PITCH_ID: number;
  HOME_TEAM: number;
  AWAY_TEAM: number | null;
  HOME_GOALS: number | null;
  AWAY_GOALS: number | null;
  TEAM_NAME: string;
  PRICE: number;
  PITCH_NAME: string;
  MATCHLOCATION: string;
  fecha?: string;
  hora?: string;
  precio?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private apiUrl = 'http://localhost/FindMatch-backend/PHP/controller/MatchController.php';

  constructor(private http: HttpClient) { }

  // Recibe userId y teamId para obtener partidos pasados de ese equipo
  getPastMatches(userId: string, teamId: number): Observable<{ success: boolean, matches: Match[] }> {
    const params = new HttpParams()
      .set('type', 'past')
      .set('user_id', userId)
      .set('team_id', teamId.toString());

    return this.http.get<{ success: boolean, matches: Match[] }>(this.apiUrl, { params });
  }

  // Recibe userId y teamId para obtener próximos partidos de ese equipo
  getUpcomingMatches(userId: string, teamId: number): Observable<{ success: boolean, matches: Match[] }> {
    const params = new HttpParams()
      .set('type', 'upcoming')
      .set('user_id', userId)
      .set('team_id', teamId.toString());

    return this.http.get<{ success: boolean, matches: Match[] }>(this.apiUrl, { params });
  }

  // Recibe userId y teamId para obtener partidos disponibles para unirse, validando que el usuario es capitán del teamId
  getAvailableMatchesToJoin(userId: string, teamId: number): Observable<{ success: boolean, matches: Match[] }> {
    const params = new HttpParams()
      .set('type', 'available')
      .set('user_id', userId)
      .set('team_id', teamId.toString());

    return this.http.get<{ success: boolean, matches: Match[] }>(this.apiUrl, { params });
  }

  // Recibe userId, teamId y matchId para unirse a un partido
  joinMatchAsAwayTeam(userId: string, teamId: number, matchId: number): Observable<{ success: boolean, message: string }> {
    const body = {
      action: 'join',
      user_id: userId,
      team_id: teamId,
      match_id: matchId
    };

    return this.http.post<{ success: boolean, message: string }>(this.apiUrl, body);
  }

  // Recibe userId, teamId y datos del partido para crear uno nuevo
  createMatch(userId: string, teamId: number, matchData: any): Observable<{ success: boolean, message: string }> {
    const body = {
      action: 'create',
      user_id: userId,
      team_id: teamId,
      ...matchData
    };

    return this.http.post<{ success: boolean, message: string }>(this.apiUrl, body);
  }

  // Recibe userId, teamId y matchId para cancelar un partido (ya sea eliminarlo si es local o abandonar si es visitante)
  cancelMatch(teamId: number, matchId: number): Observable<{ success: boolean, message: string }> {
    const body = {
      action: 'cancel',
      team_id: teamId,
      match_id: matchId
    };

    return this.http.post<{ success: boolean, message: string }>(this.apiUrl, body);
  }

}
