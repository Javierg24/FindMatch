import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var bootstrap: any;
import { ActivatedRoute } from '@angular/router';
import { SeeTeamService } from '../../../services/see-team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  miembros: any[] = [];
  equipo: any = {};
  jugadoresAlineados: { top: number, left: number }[] = [];
  isDragging = false;
  nombreCapitan: string = '';
  dragIndex = -1;
  userId: string = '';
  solicitudes: any[] = [];
  jugadorAEliminar: any = null;

  // Añadir ViewChild para acceder al modal eliminar
  @ViewChild('modalEliminarJugador') modalEliminarJugadorRef!: ElementRef;
  modalEliminarJugadorInstance: any;

  constructor(private route: ActivatedRoute, private teamService: SeeTeamService) { }

  ngOnInit(): void {
    this.cargarUsuarioActual();
    const teamId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(teamId);
    this.teamService.getMiembrosDelEquipo(teamId).subscribe(data => {
      console.log(data);
      this.equipo = data.equipo;
      this.miembros = data.jugadores;
      this.updateAlignment();
      this.obtenerNombreCapitan();
    });
  }

  ngAfterViewInit() {
    // Inicializar instancia del modal eliminar
    this.modalEliminarJugadorInstance = new bootstrap.Modal(this.modalEliminarJugadorRef.nativeElement);
  }

  abrirModalEliminar(jugador: any) {
    this.jugadorAEliminar = jugador;
    this.modalEliminarJugadorInstance.show();
  }

  cerrarModalEliminar() {
    this.modalEliminarJugadorInstance.hide();
  }

  confirmarEliminar() {
    if (!this.jugadorAEliminar) return;
    this.teamService.eliminarJugador(this.jugadorAEliminar.USER_ID, this.equipo.TEAM_ID).subscribe({
      next: () => {
        this.cerrarModalEliminar();
        // Recargar miembros para actualizar vista
        this.teamService.getMiembrosDelEquipo(this.equipo.TEAM_ID).subscribe(data => {
          this.miembros = data.jugadores;
          this.updateAlignment();
          this.obtenerNombreCapitan();
        });
      },
      error: err => {
        console.error('Error al eliminar jugador:', err);
        alert('No se pudo eliminar al jugador.');
      }
    });
  }

  cargarUsuarioActual() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userObj = JSON.parse(userStr);
      this.userId = userObj.userId || '';
    }
  }


  obtenerNombreCapitan() {
    const capitan = this.miembros.find(miembro => miembro.USER_ID === this.equipo.CAPTAIN);
    if (capitan) {
      this.nombreCapitan = `${capitan.USER_NAME} ${capitan.SURNAME}`;
      console.log('Capitán:', this.nombreCapitan);
    } else {
      this.nombreCapitan = '';
      console.warn('No se encontró un capitán en la lista de miembros.');
    }
  }

  updateAlignment() {
    const maxJugadores = this.equipo.TEAM_TYPE;
    const espacioHorizontal = 40;
    this.jugadoresAlineados = new Array(maxJugadores).fill(null).map((_, index) => ({
      top: 50,
      left: 50 + index * espacioHorizontal
    }));
  }

  onDragStart(event: MouseEvent, index: number) {
    this.isDragging = true;
    this.dragIndex = index;
    const jugador = this.jugadoresAlineados[index];
    const offsetX = event.clientX - jugador.left;
    const offsetY = event.clientY - jugador.top;

    const moveHandler = (moveEvent: MouseEvent) => {
      if (this.isDragging) {
        const newLeft = moveEvent.clientX - offsetX;
        const newTop = moveEvent.clientY - offsetY;
        const campo = document.querySelector('.soccer-field') as HTMLElement;
        const maxLeft = campo.offsetWidth - 40;
        const maxTop = campo.offsetHeight - 40;
        jugador.left = Math.max(0, Math.min(newLeft, maxLeft));
        jugador.top = Math.max(0, Math.min(newTop, maxTop));
        this.jugadoresAlineados = [...this.jugadoresAlineados];
      }
    };

    const stopDrag = () => {
      this.isDragging = false;
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', stopDrag);
    };

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', stopDrag);
  }

  abrirModalSolicitudes() {
    this.obtenerSolicitudes();
    const modalElement = document.getElementById('modalSolicitudes');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }


  obtenerSolicitudes() {
    this.teamService.obtenerSolicitudesDeEquipo(this.equipo.TEAM_ID).subscribe({
      next: (data) => {
        this.solicitudes = data.data;
        console.log(this.solicitudes);
      },
      error: (err) => {
        console.error('Error al obtener solicitudes:', err);
      }
    });
  }

aceptarSolicitud(userId: string) {
  this.teamService.aceptarSolicitud(userId, this.equipo.TEAM_ID).subscribe({
    next: () => {
      // Refrescar solicitudes
      this.obtenerSolicitudes();

      // Refrescar miembros para que aparezca el nuevo jugador
      this.teamService.getMiembrosDelEquipo(this.equipo.TEAM_ID).subscribe(data => {
        this.miembros = data.jugadores;
        this.updateAlignment();
        this.obtenerNombreCapitan();
      });
    },
    error: err => console.error(err)
  });
}


  rechazarSolicitud(userId: string) {
    this.teamService.rechazarSolicitud(userId, this.equipo.TEAM_ID).subscribe({
      next: () => this.obtenerSolicitudes(),
      error: err => console.error(err)
    });
  }

}
