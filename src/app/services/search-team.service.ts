// search-team.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Equipo {
  TEAM_ID: string;
  TEAM_NAME: string;
  TEAM_ADDRESS: string;
  CREATED: string;
  TEAM_TYPE: number;
  CAPTAIN: string;
  PICTURE: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchTeamService {

  private apiUrl = 'http://localhost/FindMatch-backend/PHP/controller/TeamController.php';

  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.apiUrl);
  }
}
