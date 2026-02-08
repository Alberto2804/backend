import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class LoginPage {
  credentials = { username: '', password: '' };

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toast: ToastController
  ) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/misiones']);
      },
      error: async (err) => {
        const t = await this.toast.create({ message: 'Credenciales inválidas', duration: 2000, color: 'danger' });
        t.present();
      }
    });
  }
}