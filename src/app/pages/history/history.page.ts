import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Transfer, User } from 'src/app/interfaces/interfaces';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  transfers: Transfer[] = [
    {
      transferId: 1,
      amount: 100,
      debitAccount: -1,
      creditAccount: -2,
      action: 0
    },
    {
      transferId: 2,
      amount: 200,
      debitAccount: -1,
      creditAccount: -2,
      action: 0
    },
    {
      transferId: 3,
      amount: 300,
      debitAccount: -1,
      creditAccount: -2,
      action: 0
    },
    {
      transferId: 4,
      amount: 400,
      debitAccount: -1,
      creditAccount: -2,
      action: 0
    },
    {
      transferId: 5,
      amount: 500,
      debitAccount: -1,
      creditAccount: -2,
      action: 0
    },
    {
      transferId: 5,
      amount: 500,
      debitAccount: -1,
      creditAccount: -2,
      action: 0
    },
    {
      transferId: 5,
      amount: 500,
      debitAccount: -1,
      creditAccount: -2,
      action: 0
    },
    {
      transferId: 5,
      amount: 500,
      debitAccount: -1,
      creditAccount: -2,
      action: 0
    },
    {
      transferId: 5,
      amount: 500,
      debitAccount: -1,
      creditAccount: -2,
      action: 0
    },
    {
      transferId: 5,
      amount: 500,
      debitAccount: -1,
      creditAccount: -2,
      action: 0
    },
    {
      transferId: 5,
      amount: 500,
      debitAccount: -1,
      creditAccount: -2,
      action: 0
    },
    {
      transferId: 5,
      amount: 500,
      debitAccount: -1,
      creditAccount: -2,
      action: 0
    },
    {
      transferId: 5,
      amount: 500,
      debitAccount: -1,
      creditAccount: -2,
      action: 0
    },
    {
      transferId: 5,
      amount: 500,
      debitAccount: -1,
      creditAccount: -2,
      action: 0
    },
  ];

  constructor( private userService: UserService,
               private router: Router,
               private toastCtrl: ToastController ) { }

  ngOnInit() {
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
