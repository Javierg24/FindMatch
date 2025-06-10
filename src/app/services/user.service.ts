import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/user-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost/FindMatch-backend/PHP/controller/UserController.php';

  constructor(private http: HttpClient) { }

  // Método para actualizar el perfil del usuario
  updateProfile(user: any): Observable<UserResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const userData = {
      user_id: user.userId,
      handle: user.handle,
      email: user.email,
      passwd: user.password || null,
      user_name: user.name,
      surname: user.surname,
      primary_position: user.primary_position || '',
      secondary_position: user.secondary_position || '',
      goals: parseInt(user.goals) || 0,
      assists: parseInt(user.assists) || 0,
      picture: user.profileImage || null
    };


    return this.http.put<UserResponse>(this.apiUrl, userData, { headers });
  }

  requestJoinTeam(teamId: number, user_id: string): Observable<any> {
    const url = `${this.apiUrl}?action=requestJoinTeam`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      team_id: teamId,
      user_id: user_id
    };

    return this.http.post<any>(url, body, { headers });
  }

}
