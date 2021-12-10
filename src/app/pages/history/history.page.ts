import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Transfer, User } from 'src/app/interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { InfoBancoService } from '../../services/info-banco.service';
import { HistoryNormal, HistoryAdmin } from '../../interfaces/interfaces';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  transfers: HistoryNormal[] = [];
  description: HistoryAdmin[] = [];
  flag = false;

  constructor( private userService: UserService,
               private router: Router,
               private infoService: InfoBancoService,
               private toastCtrl: ToastController ) { }

  ngOnInit() {
    this.userService.getCurrentUser().then((user: User) => {
      if (user) {
        this.transfers = [];
        if (user.Rol === 'admin') {
          this.description = [];
          this.infoService.getHistoryAdmin2().subscribe(resp => {
            this.transfers.push( ...resp );
          });
          this.infoService.getHistoryAdmin().subscribe(resp => {
            this.description.push( ...resp );
          });
          this.flag = true;
          //console.log('Rol ADMIN');
        } else {
          this.infoService.getHistoryNormal(user.Correo).subscribe(resp => {
            this.transfers.push( ...resp );
          });
          this.flag = false;
          //console.log('Rol NOMRAL');
        }
      }
    });
  }

  ionViewWillEnter() {
    this.userService.getCurrentUser().then((user: User) => {
      if (!user) {
        this.presentToast('Please sign in', 'danger');
        this.router.navigate(['/login']);
      }else if(user.Disponible === 0){
      this.presentToast('Account not available', 'danger');
      this.router.navigate(['/login']);
    }
    });
  }

  async presentToast( message: string, color: string ) {
    const toast = await this.toastCtrl.create({
      message,
      color,
      duration: 1500,
    });
    toast.present();
  }

}
