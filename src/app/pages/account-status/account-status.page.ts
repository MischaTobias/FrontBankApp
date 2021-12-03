import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { Account } from '../../interfaces/interfaces';

@Component({
  selector: 'app-account-status',
  templateUrl: './account-status.page.html',
  styleUrls: ['./account-status.page.scss'],
})
export class AccountStatusPage implements OnInit {

  userAccounts: Account[] = [
    {
      accountId: 1,
      currentBalance: 100
    },
    {
      accountId: 2,
      currentBalance: 200
    },
    {
      accountId: 3,
      currentBalance: 300
    },
    {
      accountId: 4,
      currentBalance: 400
    },
    {
      accountId: 5,
      currentBalance: 500
    },
  ];

  constructor( private userService: UserService,
               private router: Router,
               private toastCtrl: ToastController ) { }

  ngOnInit() {
  }

  checkHistory( account: Account ) {

  }

  transfer( account: Account ) {

  }

  ionViewWillEnter() {
    this.userService.getCurrentUser().then((user: User) => {
      if (!user) {
        this.presentToast('Please sign in', 'danger');
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