import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/FindMatch-backend/PHP/controller/UserController.php'; // URL del backend

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) { }

  // Método para hacer el login
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      tap((response) => {
        if (response.success) {
          const userData = {
            handle: response.user.handle,
            name: response.user.name,
            surname: response.user.surname,
            picture: response.user.picture,
            primary_position: response.user.primary_position,
            secondary_position: response.user.secondary_position,
            goals: response.user.goals,
            assists: response.user.assists,
            user_type: response.user.user_type,
            email: response.user.email,
            userId: response.user.userId
          };

          localStorage.setItem('user', JSON.stringify(userData));
          this.cookieService.set('user', JSON.stringify(userData), 1, '/', 'localhost');
        }
      })
    );
  }


  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('user');
    this.cookieService.delete('user', '/', 'localhost'); // Eliminar cookie
    this.router.navigate(['/login']);
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null && this.cookieService.check('user');
  }

  // Obtener usuario desde localStorage o cookies
  getUser(): any {
    const user = localStorage.getItem('user') && this.cookieService.get('user');
    return user ? JSON.parse(user) : null;
  }

  // Método para obtener el correo desde localStorage
  getUserEmail(): string | null {
    const user = this.getUser();
    return user ? user.email : null;
  }

  // Método para obtener el tipo de usuario
  getUserType(): string | null {
    const user = this.getUser();
    return user ? user.user_type : null;
  }
}
