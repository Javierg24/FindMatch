import { Component, OnInit } from '@angular/core';
import { SearchTeamService } from '../../../services/search-team.service';
import { UserService } from '../../../services/user.service';
import { EquipoService } from '../../../services/equipo.service'; // <--- AÑADIDO

export interface Equipo {
  TEAM_ID: string;
  TEAM_NAME: string;
  TEAM_ADDRESS: string;
  CREATED: string;
  TEAM_TYPE: number;
  CAPTAIN: string;
  PICTURE: string;
  logo?: string;
}

@Component({
  selector: 'app-search-team',
  templateUrl: './search-team.component.html',
  styleUrls: ['./search-team.component.scss']
})
export class SearchTeamComponent implements OnInit {
  equipos: Equipo[] = [];
  equiposUsuario: string[] = []; // <--- NUEVO
  filtroNombre: string = '';
  filtroTipo: string = '';

  constructor(
    private searchTeamService: SearchTeamService,
    private userService: UserService,
    private equipoService: EquipoService // <--- AÑADIDO
  ) {}

  ngOnInit(): void {
    this.cargarEquipos();
    this.cargarEquiposUsuario();
  }

  cargarEquipos(): void {
    this.searchTeamService.getAllTeams().subscribe({
      next: (data) => {
        this.equipos = data.map(team => ({
          ...team,
          logo: team.PICTURE && team.PICTURE.startsWith('data:')
            ? team.PICTURE
            : 'assets/logos/default.png'
        }));
      },
      error: (error) => {
        console.error('Error al cargar equipos', error);
      }
    });
  }

  cargarEquiposUsuario(): void {
    const userStr = localStorage.getItem('user');
    if (!userStr) return;

    try {
      const user = JSON.parse(userStr);
      const userId = user.userId;

      this.equipoService.getTeamsByUserId(userId).subscribe({
        next: (data) => {
          this.equiposUsuario = data.map((team: any) => team.TEAM_ID);
          console.log(this.equiposUsuario);
        },
        error: (error) => {
          console.error('Error al obtener equipos del usuario:', error);
        }
      });
    } catch (error) {
      console.error('Error al parsear usuario', error);
    }
  }

  get equiposFiltrados(): Equipo[] {
    return this.equipos.filter(equipo => {
      return (
        (this.filtroNombre === '' || equipo.TEAM_NAME.toLowerCase().includes(this.filtroNombre.toLowerCase())) &&
        (this.filtroTipo === '' || equipo.TEAM_TYPE === +this.filtroTipo)
      );
    });
  }

  yaEsMiembro(teamId: string): boolean {
    return this.equiposUsuario.includes(teamId);
  }

  unirseEquipo(teamId: string): void {
    const userData = localStorage.getItem('user');
    if (!userData) {
      console.error('Usuario no autenticado');
      return;
    }

    const user = JSON.parse(userData);
    const userId = user.userId;

    this.userService.requestJoinTeam(+teamId, userId).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Solicitud enviada correctamente.');
        } else {
          alert('Error al enviar la solicitud: ' + response.message);
        }
      },
      error: (error) => {
        console.error('Error en la solicitud de unión:', error);
        alert('Error al enviar la solicitud.');
      }
    });
  }
}
