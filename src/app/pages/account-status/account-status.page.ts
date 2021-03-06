import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { Account } from '../../interfaces/interfaces';
import { InfoBancoService } from '../../services/info-banco.service';

@Component({
  selector: 'app-account-status',
  templateUrl: './account-status.page.html',
  styleUrls: ['./account-status.page.scss'],
})
export class AccountStatusPage implements OnInit {

  userAccounts: Account[] = [];

  constructor( private userService: UserService,
               private router: Router,
               private infoService: InfoBancoService,
               private toastCtrl: ToastController ) { }

  ngOnInit() {
    this.userAccounts = [];
    this.userService.getCurrentUser().then((user: User) => {
      if (user) {
        this.infoService.getAccountStatus(user.Correo).subscribe(resp => {
          if (this.userAccounts.length !== 0) {
          this.userAccounts.push(...resp);
          }
        });
      }
    });
  }

  checkHistory( account ) {
    //console.log(account);
    this.router.navigate(['/history']);
  }

  transfer( account: Account ) {
    //console.log(account);
    this.router.navigate(['/transfer']);
  }

  ionViewWillEnter() {
    this.userAccounts = [];
    this.userService.getCurrentUser().then((user: User) => {
      if (!user) {
        this.presentToast('Please sign in', 'danger');
        this.router.navigate(['/login']);
      } else if(user.Disponible === 0){
        this.presentToast('Account not available', 'danger');
        this.router.navigate(['/login']);
      }
      else {
        this.infoService.getAccountStatus(user.Correo).subscribe(resp => {
          this.userAccounts.push(...resp);
        });
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
