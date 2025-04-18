import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-referee',
  templateUrl: './register-referee.component.html',
  styleUrls: ['./register-referee.component.scss']
})
export class RegisterRefereeComponent {

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
