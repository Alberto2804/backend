import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class RegistroPage {
  data = { username: '', password: '', rank: 'Genin' };

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toast: ToastController
  ) {}

  register() {
    this.authService.register(this.data).subscribe({
      next: () => {
        this.router.navigate(['/misiones']);
      },
      error: async () => {
        const t = await this.toast.create({ message: 'Error al registrar', duration: 2000, color: 'danger' });
        t.present();
      }
    });
  }
}