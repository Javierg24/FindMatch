import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user = {
    handle: 'JaviGol123',
    nombre: 'Javier',
    apellido: 'Ruiz',
    email: 'javi@example.com',
    posicion1: 'DFC',
    posicion2: 'LD',
    goles: 12,
    asistencias: 5,
    edad: 23
  };

}
