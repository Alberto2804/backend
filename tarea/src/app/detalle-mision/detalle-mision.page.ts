import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MissionService } from '../mision-service';

@Component({
  selector: 'app-detalle-mision',
  templateUrl: './detalle-mision.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetalleMisionPage implements OnInit {
  missionId: string = '';
  reportText: string = '';
  evidenceUrl: string = 'https://placehold.co/600x400';

  constructor(
    private route: ActivatedRoute,
    private missionService: MissionService,
    private toast: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
  
    this.route.queryParams.subscribe(params => {
      this.missionId = params['id'];
    });
  }

  sendReport() {
    if (!this.reportText) return;

    this.missionService.reportMission(this.missionId, this.reportText, this.evidenceUrl)
      .subscribe({
        next: async () => {
          const t = await this.toast.create({ message: '¡Misión Cumplida! +XP', duration: 2000, color: 'success' });
          t.present();
          this.navCtrl.navigateBack('/misiones');
        },
        error: async () => {
          const t = await this.toast.create({ message: 'Error al reportar', duration: 2000, color: 'danger' });
          t.present();
        }
      });
  }
}