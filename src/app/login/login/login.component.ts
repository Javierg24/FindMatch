import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/loginService/auth-service.service';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router,private meta: Meta,
    private title: Title,) {
    //Meta y título
    this.title.setTitle('Login');
    this.meta.updateTag({ name: 'description', content: 'Página de login de usuarios' });
    this.meta.updateTag({ name: 'keywords', content: 'Login de usuarios' });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Validación de email
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).*$/) // Al menos una mayúscula y un número
      ]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Llamada al servicio de login
      this.authService.login(email, password).subscribe({
        next: (response) => {
          // Si la respuesta es exitosa, redirige al usuario
          if (response.mensaje === 'Login exitoso') {
            localStorage.setItem('user', JSON.stringify(response.usuario)); // Suponiendo que response.usuario contiene el usuario
            this.router.navigate(['/src/app/Players/Profile/profile']);
          } else {
            this.errorMessage = 'Correo o contraseña incorrectos';
          }
        },
        error: (error) => {
          this.errorMessage = 'Hubo un error al intentar iniciar sesión. Por favor, inténtelo de nuevo más tarde.';
        }
      });
    } else {
      alert('Formulario inválido. Revisa los campos.');
    }
  }

  showPassword: boolean = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

}
