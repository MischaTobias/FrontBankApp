import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Account, Transfer, User } from 'src/app/interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { InfoBancoService } from '../../services/info-banco.service';
import { AccountFriend } from '../../interfaces/interfaces';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit {

  userAccounts: Account[] = [];
  debitAccount: number = 0;
  creditAccount: number = 0;
  accountFriends: AccountFriend[] = [];
  amount: number = 0;
  flag_amount: boolean = false;
  message = '';

  constructor( private userService: UserService,
               private router: Router,
               private infoService: InfoBancoService,
               private toastCtrl: ToastController ) { }

  ngOnInit() {
    this.userService.getCurrentUser().then((user: User) => {
      if (user) {
        this.infoService.getAccountStatus(user[0].Correo).subscribe(resp => {
          this.userAccounts = [];
          this.userAccounts.push(...resp);
        });
      }
    });
  }

  changeDebitAccount( event ) {
    this.debitAccount = event.detail.value;
    this.infoService.getAccountsFriends(event.detail.value).subscribe(resp => {
      this.accountFriends = [];
      this.accountFriends.push(...resp);
    });
  }

  changeCreditAccount( event ) {
    this.creditAccount = event.detail.value;
  }

  onSubmit( form: NgForm ) {
    if ( form.status === 'INVALID') {
      this.presentToast('Invalid Information', 'danger');
      return;
    }

    this.userAccounts.forEach(element => {
      if (element.idCuenta == this.debitAccount) {
        if (element.MontoActual >= this.amount) {
          this.flag_amount = true;
        }
      }
    });

    if (this.flag_amount) {
      this.flag_amount = false;
      //debit
      this.postTransfer();
      this.postHistory();
      this.putAccount();
      //credit
      this.postTransfer();
      this.postHistory();
      this.putAccount();

      this.presentToast('Valid transfer', 'success');
    }else{
      this.presentToast('Invalid amount', 'danger');
    }

  }

  postTransfer(){

  }

  postHistory(){

  }

  putAccount(){

  }

  keyDownFunction( event, form ) {
    if (event.keyCode === 13) {
      this.onSubmit( form );
    }
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
