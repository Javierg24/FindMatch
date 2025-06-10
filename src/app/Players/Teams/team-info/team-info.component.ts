import { Component, OnInit } from '@angular/core';
declare var bootstrap: any;
import { EquipoService, Team } from '../../../services/equipo.service';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss']
})
export class TeamInfoComponent implements OnInit {
  equipos: Team[] = [];
  userId: string = '';  // Aquí guardaremos el userId extraído

  newTeam = {
    nombre: '',
    categoria: '',
    localidad: ''
  };

  localidades: string[] = ['Sevilla', 'Madrid', 'Barcelona', 'Valencia', 'Bilbao'];

  constructor(private teamService: EquipoService) {}

  ngOnInit(): void {
    this.loadUserIdFromStorage();
    this.obtenerEquiposDelUsuario();
  }

  loadUserIdFromStorage(): void {
    const userStr = localStorage.getItem('user'); // O la clave donde tengas almacenado el objeto
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        this.userId = userObj.userId || '';
      } catch (e) {
        console.error('Error parsing user from localStorage', e);
      }
    }
  }

  obtenerEquiposDelUsuario(): void {
    if (!this.userId) {
      console.error('No userId found');
      return;
    }
    this.teamService.getTeamsByUserId(this.userId).subscribe({
      next: (data) => {
        console.log(data)
        this.equipos = data;
      },
      error: (error) => {
        console.error('Error al obtener equipos:', error);
      }
    });
  }

  openCreateTeamModal(): void {
    const modalElement = document.getElementById('createTeamModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  createTeam(): void {
    if (this.newTeam.nombre && this.newTeam.categoria && this.newTeam.localidad && this.userId) {
      const payload = {
        TEAM_NAME: this.newTeam.nombre,
        TEAM_ADDRESS: this.newTeam.localidad,
        TEAM_TYPE: Number(this.newTeam.categoria),
        CAPTAIN: this.userId
      };

      this.teamService.createTeam(payload).subscribe({
        next: (response) => {
          console.log('Equipo creado:', response);
          this.newTeam = { nombre: '', categoria: '', localidad: '' };
          this.cerrarModal();
          this.obtenerEquiposDelUsuario();
        },
        error: (error) => {
          console.error('Error al crear equipo:', error);
        }
      });
    } else {
      console.warn('Faltan datos para crear el equipo o userId no definido');
    }
  }

  cerrarModal(): void {
    const modalElement = document.getElementById('createTeamModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) modal.hide();
    }
  }
}
