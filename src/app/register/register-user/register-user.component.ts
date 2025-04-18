import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent {
  registerForm: FormGroup;
  showPassword = false;
  showConfirm = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: [''],
      name: [''],
      surname: [''],
      email: [''],
      password: [''],
      confirmPassword: ['']
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirm() {
    this.showConfirm = !this.showConfirm;
  }

  onRegister() {
    console.log(this.registerForm.value);
    // Aquí podrías enviar el formulario al backend
  }
}
