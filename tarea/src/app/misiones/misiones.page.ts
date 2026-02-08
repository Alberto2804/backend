import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, NavController } from '@ionic/angular'; 
import { RouterModule } from '@angular/router'; 

import { MissionService } from '../mision-service';
import { AuthService } from '../auth';
import { Mission } from '../interfaces';
@Component({
  selector: 'app-misiones',
  templateUrl: './misiones.page.html',
  styleUrls: ['./misiones.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule] 
})
export class MisionesPage implements OnInit {
  missions: Mission[] = [];
  filteredMissions: Mission[] = [];
  segmentValue = 'DISPONIBLE'; 
  myRank: string = 'Genin';
  searchText = '';
  

  constructor(
    private missionService: MissionService,
    private authService: AuthService,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    
    this.myRank = this.authService.getRank(); 
  }

  ionViewWillEnter() {
    
    this.loadMissions();
  }

  loadMissions() {
    this.missionService.getMissions().subscribe({
      next: (res) => {
        this.missions = res.data;
        this.filterMissions(); 
      },
      error: (err) => console.error('Error cargando misiones', err)
    });
  }

  
 filterMissions() {
    const query = this.searchText.toLowerCase();

    this.filteredMissions = this.missions.filter(m => {
      const matchesStatus = m.status === this.segmentValue;
      
      const matchesSearch = m.title.toLowerCase().includes(query) || 
                            m.description.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }

  
  accept(mission: Mission) {
    if (this.myRank === 'Genin' && mission.rankRequirement === 'S') {
      this.showToast('¡Te falta odio (y rango) para esta misión!', 'danger');
      return;
    }

    this.missionService.acceptMission(mission.id).subscribe({
      next: () => {
        this.showToast('Misión aceptada. ¡Dattebayo!', 'success');
        this.loadMissions();
      },
      error: (err) => {
        this.showToast(err.error.message || 'Error al aceptar', 'danger');
      }
    });
  }

  
  goToDetail(mission: any) {
    this.navCtrl.navigateForward('/detalle-mision', {
      queryParams: {
        id: mission.id,
        title: mission.title,
        desc: mission.description,
        rank: mission.rankRequirement,
        reward: mission.reward,
        status: mission.status
      }
    });
  }

  async showToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}