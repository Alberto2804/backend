import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MissionService } from '../mision-service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-detalle-mision',
  templateUrl: './detalle-mision.page.html',
  styleUrls: ['./detalle-mision.page.scss'], 
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetalleMisionPage implements OnInit {
  
  mission: any = {
    id: '', title: '', desc: '', rank: '', reward: 0, status: ''
  };
  
  reportText = '';
  evidenceUrl = '';

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private missionService: MissionService,
    private toast: ToastController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params['id']) {
        this.mission = params;
      }
    });
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt 
      });

     
      if (image.dataUrl) {
        this.evidenceUrl = image.dataUrl;
      }
    } catch (error) {
      console.log('El usuario canceló la foto o hubo error', error);
    }
  }

  accept() {
    this.missionService.acceptMission(this.mission.id).subscribe({
      next: () => {
        this.presentToast('¡Misión Aceptada!', 'success');
        this.navCtrl.navigateBack('/misiones');
      },
      error: (err) => this.presentToast('No tienes rango suficiente', 'danger')
    });
  }

  

  sendReport() {

    if (!this.reportText || !this.evidenceUrl) {
      this.presentToast('Debes completar el reporte y añadir una foto', 'warning');
      return;
    }
    this.missionService.reportMission(this.mission.id, this.reportText, this.evidenceUrl)
      .subscribe({
        next: () => {
          this.presentToast('¡Gran trabajo! +XP Ganada', 'warning');
          this.navCtrl.navigateBack('/misiones');
        },
        error: () => this.presentToast('Error al enviar reporte', 'danger')
      });
  }

  async presentToast(msg: string, color: string) {
    const t = await this.toast.create({ message: msg, duration: 2000, color: color });
    t.present();
  }
}