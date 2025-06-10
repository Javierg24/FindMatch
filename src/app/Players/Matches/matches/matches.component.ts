import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { EquipoService, Team } from '../../../services/equipo.service';
import { MatchService } from '../../../services/match.service';
import { SportCentreService } from '../../../services/sport-centre.service';
import { PitchService } from './../../../services/pitch.service';

interface SportCentre {
  SPORT_CENTRE_ID: string;
  SPORT_CENTRE_NAME: string;
  LOCATION: string;
  // Agrega otros campos si existen en tu tabla
}

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  vistaSeleccionada: string = 'proximos';
  selectedTeamId: number | undefined;
  selectedTeamType: number | null = null;
  equipos: Team[] = [];
  userId: string = '';
  proximosPartidos: any[] = [];
  partidosHistorial: any[] = [];
  partidosParaUnirse: any[] = [];
  sportCentres: SportCentre[] = [];
  pitches: any[] = [];
  modalInstance!: bootstrap.Modal;
  precioSugerido: number = 0;
  sportCentresLocation: string | null = null;
  equiposCapitan: Team[] = [];
  nombreEquipoSeleccionado: string = '';
  capitanActual: boolean = false;

  @ViewChild('createMatchModal', { static: false }) createMatchModal!: ElementRef;

  constructor(private equipoService: EquipoService, private matchService: MatchService, private sportCentreService: SportCentreService, private pitchService: PitchService) { }

  ngOnInit() {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        this.userId = userData.userId || '';
      } catch (error) {
        console.error('Error parsing user data from localStorage', error);
      }
    } else {
      console.warn('No hay datos de usuario en localStorage');
    }
    this.equipoService.getTeamsWhereUserIsCaptain(this.userId).subscribe({
      next: (data) => {
        this.equiposCapitan = data;
      },
      error: (err) => {
        console.error('Error al obtener equipos donde es capitán', err);
        this.equiposCapitan = [];
      }
    });
    this.equipoService.getTeamsByUserId(this.userId).subscribe({
      next: (data) => {
        this.equipos = data;
        console.log(this.equipos);

        if (this.equipos.length > 0) {
          this.selectedTeamId = this.equipos[0].TEAM_ID;
          this.onTeamSelect();
        }
      },
      error: (error) => {
        console.error('Error al obtener equipos:', error);
      }
    });
  }

  esCapitanDelEquipo(teamId: number): boolean {
    var esCapitan = this.equiposCapitan.some(equipo => equipo.TEAM_ID === Number(teamId));
    console.log(esCapitan);
    return esCapitan;
  }



  onTeamSelect() {
    if (!this.selectedTeamId || isNaN(this.selectedTeamId)) {
      console.warn('ID de equipo no válido');
      return;
    }

    const equipoSeleccionado = this.equipos.find(e => e.TEAM_ID === this.selectedTeamId);
    this.selectedTeamType = equipoSeleccionado ? equipoSeleccionado.TEAM_TYPE : null;
    this.nombreEquipoSeleccionado = equipoSeleccionado ? equipoSeleccionado.TEAM_NAME : '';
    console.log(this.equiposCapitan)
    this.capitanActual = this.esCapitanDelEquipo(this.selectedTeamId!);


    switch (this.selectedTeamType) {
      case 5:
        this.precioSugerido = 15;
        break;
      case 7:
        this.precioSugerido = 30;
        break;
      case 11:
        this.precioSugerido = 60;
        break;
      default:
        this.precioSugerido = 0;
    }

    this.loadUpcomingMatches(this.selectedTeamId);
    this.loadPastMatches(this.selectedTeamId);
    this.loadJoinableMatches(this.selectedTeamId);
  }



  unirseAPartido(teamId: number, matchId: number) {
    if (!this.userId) {
      alert('Debes estar autenticado para unirte a un partido');
      return;
    }
    this.matchService.joinMatchAsAwayTeam(this.userId, teamId, matchId).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Te has unido al partido correctamente.');
          this.loadJoinableMatches(teamId);
          this.loadUpcomingMatches(teamId);
        } else {
          alert('No se pudo unir al partido: ' + response.message);
        }
      },
      error: (err) => {
        console.error('Error al unirse al partido', err);
        alert('Error al unirse al partido, revisa la consola.');
      }
    });
  }


  onTeamChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTeamId = Number(selectElement.value);
    const equipoSeleccionado = this.equipos.find(e => e.TEAM_ID === this.selectedTeamId);
    this.selectedTeamType = equipoSeleccionado ? equipoSeleccionado.TEAM_TYPE : null;
    this.nombreEquipoSeleccionado = equipoSeleccionado ? equipoSeleccionado.TEAM_NAME : '';

    switch (this.selectedTeamType) {
      case 5:
        this.precioSugerido = 15;
        break;
      case 7:
        this.precioSugerido = 30;
        break;
      case 11:
        this.precioSugerido = 60;
        break;
      default:
        this.precioSugerido = 0;
    }

  }

  loadUpcomingMatches(teamId: number) {
    this.matchService.getUpcomingMatches(this.userId, teamId).subscribe({
      next: (response) => {
        if (response.success) {

          this.proximosPartidos = response.matches;
          console.log(this.proximosPartidos);
        } else {
          this.proximosPartidos = [];
          console.warn('No se obtuvieron próximos partidos para el usuario');
        }
      },
      error: (err) => {
        console.error('Error cargando próximos partidos', err);
        this.proximosPartidos = [];
      }
    });
  }

  loadPastMatches(teamId: number) {
    this.matchService.getPastMatches(this.userId, teamId).subscribe({
      next: (response) => {
        if (response.success) {
          this.partidosHistorial = response.matches;
          console.log(this.partidosHistorial);
        } else {
          this.partidosHistorial = [];
          console.warn('No se encontraron partidos pasados');
        }
      },
      error: (err) => {
        console.error('Error cargando partidos pasados', err);
        this.partidosHistorial = [];
      }
    });
  }

  loadJoinableMatches(teamId: number) {
    this.matchService.getAvailableMatchesToJoin(this.userId, teamId).subscribe({
      next: (response) => {
        if (response.success) {
          this.partidosParaUnirse = response.matches;
          console.log('Partidos para unirse:', this.partidosParaUnirse);
        } else {
          this.partidosParaUnirse = [];
          console.warn('No se encontraron partidos disponibles para unirse');
        }
      },
      error: (err) => {
        console.error('Error cargando partidos disponibles para unirse', err);
        this.partidosParaUnirse = [];
      }
    });
  }


  openCreateMatchModal() {
    if (!this.modalInstance) {
      this.modalInstance = new bootstrap.Modal(this.createMatchModal.nativeElement);
    }
    this.modalInstance.show();

    if (this.userId) {
      this.getSportCentres();
    } else {
      console.warn('UserId vacío, no se pueden cargar equipos');
      this.equiposCapitan = [];
    }
  }


  getSportCentres() {
    this.sportCentreService.getAllSportCentres().subscribe({
      next: (response) => {
        if (response.success) {
          this.sportCentres = response.sport_centres;
          console.log(this.sportCentres);
        }
      },
      error: (error) => {
        console.error('Error al obtener los centros deportivos', error);
      }
    });
  }


  onSportCentreChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const selectedCentreId = select.value;

    if (this.selectedTeamType)
      if (selectedCentreId && this.selectedTeamType > 0) {
        // Filtrar por centro y categoría
        this.pitchService.getPitchesByCentreAndCategory(selectedCentreId, this.selectedTeamType).subscribe({
          next: (response) => {
            if (response.success) {
              this.pitches = response.pitches
              console.log(this.pitches);
            } else {
              this.pitches = [];
              console.warn('No se encontraron pistas para el centro y categoría seleccionados');
            }
          },
          error: (err) => {
            console.error('Error al obtener pistas', err);
            this.pitches = [];
          }
        });
      } else {
        // Solo centro sin categoría (fallback)
        this.pitchService.getPitchesBySportCentreId(selectedCentreId).subscribe({
          next: (response) => {
            if (response.success) {
              this.pitches = response.pitches;
            } else {
              this.pitches = [];
              console.warn('No se encontraron pistas para el centro seleccionado');
            }
          },
          error: (err) => {
            console.error('Error al obtener pistas', err);
            this.pitches = [];
          }
        });
      }
  }


  createMatch(teamId: number) {
    // Obtener valores de inputs del modal
    const matchDate = (document.getElementById('matchDate') as HTMLInputElement).value;
    const matchTime = (document.getElementById('matchTime') as HTMLInputElement).value;
    const matchPrice = (document.getElementById('matchPrice') as HTMLInputElement).value;
    const matchType = this.selectedTeamType;
    const matchPitch = (document.getElementById('matchPitch') as HTMLSelectElement).value;

    if (!matchDate || !matchTime || !matchPrice || !matchType) {
      alert('Por favor, rellena todos los campos.');
      return;
    }

    // Construir objeto para enviar
    const matchData = {
      home_team: this.selectedTeamId,  // 🔁 corregido aquí
      match_date: matchDate,           // 🔁 desglosado
      match_time: matchTime,           // 🔁 desglosado
      price: Number(matchPrice),
      type: matchType,
      pitch_id: matchPitch,            // 🔁 nombre correcto esperado
      user_id: this.userId
    };


    console.log(matchData);

    this.matchService.createMatch(this.userId, teamId, matchData).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Partido creado correctamente');
          this.modalInstance.hide();
          this.loadUpcomingMatches(teamId); // Recargar partidos para actualizar lista
        } else {
          alert('Error al crear partido: ' + response.message);
        }
      },
      error: (err) => {
        console.error('Error creando partido', err);
        alert(err.error.message || 'Error al crear el partido')
      }
    });
  }

  cancelarPartido(teamId: number, matchId: number) {
    if (!confirm('¿Seguro que quieres cancelar este partido?')) {
      return;
    }

    this.matchService.cancelMatch(teamId, matchId).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Partido cancelado correctamente.');
          // Recarga las listas para reflejar el cambio
          this.loadUpcomingMatches(teamId);
          this.loadJoinableMatches(teamId);
        } else {
          alert('No se pudo cancelar el partido: ' + response.message);
        }
      },
      error: (err) => {
        console.error('Error al cancelar partido', err);
        alert('Error al cancelar el partido, revisa la consola.');
      }
    });
  }

}
