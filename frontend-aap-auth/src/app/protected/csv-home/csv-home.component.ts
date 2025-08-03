import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-csv-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './csv-home.component.html',
  styleUrls: ['./csv-home.component.css']
})
export class CsvHomeComponent implements OnInit {
  users: any[] = [];
  usuariosCargados = false; 

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.loadUsers();
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res.users;
        this.usuariosCargados = true; 
        console.log('Usuarios cargados:', this.users);
      },
      error: (err: HttpErrorResponse) => {
        this.usuariosCargados = true; 
        console.error('Error al cargar usuarios:', err.message);
        alert('Error al cargar usuarios. Verifica tu token o sesión.');
      }
    });
  }

  actualizarUsuario(user: any) {
    const nuevoEmail = prompt('Ingresa el nuevo email:', user.email);
    if (!nuevoEmail) {
      alert('El email es obligatorio.');
      return;
    }

    const nuevoPassword = prompt('Ingresa la nueva contraseña (deja vacío si no deseas cambiarla):', '');

    const dataToUpdate: any = { email: nuevoEmail };
    if (nuevoPassword && nuevoPassword.trim() !== '') {
      dataToUpdate.password = nuevoPassword;
    }

    this.authService.updateUser(user._id, dataToUpdate).subscribe({
      next: (res: any) => {
        alert('Usuario actualizado con éxito.');
        this.loadUsers();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error actualizando usuario:', err.message);
        alert('Error al actualizar usuario.');
      }
    });
  }
}
