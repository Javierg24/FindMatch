import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PitchService {
  private apiUrl = 'http://localhost/FindMatch-backend/PHP/controller/PitchController.php'; // Ajusta esta URL si es necesario

  constructor(private http: HttpClient) {}

  getPitchesBySportCentreId(sportCentreId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?sport_centre_id=${sportCentreId}`);
  }

  getPitchesByCentreAndCategory(sportCentreId: string, category: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?sport_centre_id=${sportCentreId}&category=${category}`);
  }
}

