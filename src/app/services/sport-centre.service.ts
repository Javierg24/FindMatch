import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SportCentre {
  SPORT_CENTRE_ID: string;
  SPORT_CENTRE_NAME: string;
  LOCATION: string;
  // Agrega otros campos si existen en tu tabla
}

@Injectable({
  providedIn: 'root'
})
export class SportCentreService {

  private apiUrl = 'http://localhost/FindMatch-backend/PHP/controller/SportCentreController.php'; // Ajusta la URL real

  constructor(private http: HttpClient) {}

  getAllSportCentres(): Observable<{ success: boolean, sport_centres: SportCentre[] }> {
    return this.http.get<{ success: boolean, sport_centres: SportCentre[] }>(this.apiUrl);
  }
}
