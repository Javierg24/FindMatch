import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router'; // ✅ Importamos Router
import { UserService } from '../../../services/user.service';
import { UserResponse } from '../../../models/user-response.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  user: any = {};
  editMode = false;
  posiciones: string[] = ['POR', 'DFC', 'LD', 'LI', 'MCD', 'MC', 'MCO', 'ED', 'DC', 'EI'];

  constructor(
    private userService: UserService,
    private router: Router // ✅ Inyectamos Router
  ) { }

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.user.profileImage = reader.result as string;  // base64 para mostrar la imagen
      };

      reader.readAsDataURL(file);
    }
  }


  editProfile() {
    this.editMode = true;
  }

  saveProfile() {
    this.editMode = false;

    this.userService.updateProfile(this.user).subscribe(
      (response: UserResponse) => {
        console.log('Perfil actualizado correctamente', response);
        if (response.success) {
          localStorage.setItem('user', JSON.stringify(this.user));
        } else {
          console.error('Error al actualizar el perfil: ', response.message);
        }
      },
      (error) => {
        console.error('Error al actualizar el perfil', error);
      }
    );
  }

  // ✅ Método logout
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']); // Ajusta esta ruta si tu login está en otra URL
  }
}
