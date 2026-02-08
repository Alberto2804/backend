import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth';
import { MissionService } from '../mision-service';
import { NinjaStats } from '../interfaces';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PerfilPage implements OnInit {
  stats: NinjaStats | null = null;

  constructor(
    private authService: AuthService,
    private missionService: MissionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.missionService.getStats().subscribe(res => {
      this.stats = res;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}