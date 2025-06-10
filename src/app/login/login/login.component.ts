import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/loginService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Validación para el email
      password: ['', [Validators.required, Validators.minLength(6)]]  // Validación para la contraseña
    });
  }

  // Método para mostrar/ocultar la contraseña
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // Método de inicio de sesión
  login(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response: any) => {
        if (response.success) {
          console.log('Login successful:', response);

          // Guardar información del usuario si es necesario
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('userType', response.type);

          // Redirigir a la página principal o dashboard
          this.router.navigate(['/profile']);
        } else {
          this.errorMessage = response.message || 'Credenciales incorrectas. Inténtalo de nuevo.';
        }
      },
      error: (error) => {
        console.error('Error de login:', error);
        this.errorMessage = 'Hubo un error al iniciar sesión. Inténtalo más tarde.';
      }
    });
  }
}
