import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterPlayerService } from '../../services/register-player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent {
  registerForm: FormGroup;
  showPassword = false;
  showConfirm = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private registerPlayerService: RegisterPlayerService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      primaryPosition: ['', Validators.required],
      secondaryPosition: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirm() {
    this.showConfirm = !this.showConfirm;
  }

  // Método para enviar el formulario de registro
  registerPlayer() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    // Verificamos que las contraseñas coincidan
    const { password, confirmPassword } = this.registerForm.value;
    if (password !== confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    // Construimos el objeto para enviar al backend
    const playerData = {
      handle: this.registerForm.value.username,
      user_name: this.registerForm.value.name,
      surname: this.registerForm.value.surname,
      email: this.registerForm.value.email,
      primary_position: this.registerForm.value.primaryPosition,
      secondary_position: this.registerForm.value.secondaryPosition,
      password: this.registerForm.value.password
    };
    console.log(playerData);

    // Enviamos la solicitud al servicio para registrar el jugador
    this.registerPlayerService.registerPlayer(playerData).subscribe(
      response => {
        if (response.success) {
          alert('Jugador registrado con éxito.');
          this.registerForm.reset();
          this.errorMessage = '';
          this.router.navigate(['/login']);
        } else {
          // En caso de error, mostramos el mensaje correspondiente
          this.errorMessage = response.message || 'Error al registrar el jugador.';
        }
      },
      error => {
        console.error('Error al registrar el jugador:', error);
        this.errorMessage = error.message || 'Error al registrar el jugador. Por favor, intenta de nuevo.';
      }
    );
  }

}
