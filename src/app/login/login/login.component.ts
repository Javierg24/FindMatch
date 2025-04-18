import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const { email, password } = this.loginForm.value;

    if (email === 'correo@example.com' && password === '123456') {
      this.loginMessage = 'Inicio de sesión exitoso!';
      // redireccionar o guardar sesión
    } else {
      this.loginMessage = 'Correo o contraseña incorrectos.';
    }
  }

  signInWithGoogle(): void {
    // Aquí puedes integrar Firebase Authentication con Google
    console.log('Integrar Firebase Auth para Google');
  }

  showPassword: boolean = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

}
