/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Account, AccountFriend, friendAccount, User } from 'src/app/interfaces/interfaces';
import { InfoBancoService } from 'src/app/services/info-banco.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-new-friend',
  templateUrl: './add-new-friend.page.html',
  styleUrls: ['./add-new-friend.page.scss'],
})
export class AddNewFriendPage implements OnInit {

  accounts: friendAccount[] = [
    {
      accountId: '1234',
      owner: 'Mischa'
    },
    {
      accountId: '5678',
      owner: 'Walter'
    },
  ];
  userAccounts: Account[] = [];
  debitAccount: number = 0;

  constructor( private modalCtrl: ModalController,
               private infoService: InfoBancoService,
               private userService: UserService,
               private toastCtrl: ToastController ) { }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  addAccount( accountNumber: string ) {
    //add acount
    if (this.debitAccount === 0) {
      this.presentToast('Please select an origin account', 'danger');
      return;
    }

    console.log(this.debitAccount);
    console.log(accountNumber);
    this.dismissModal();
  }


  async presentToast( message: string, color: string ) {
    const toast = await this.toastCtrl.create({
      message,
      color,
      duration: 1500,
    });
    toast.present();
  }

  changeDebitAccount( event ) {
    this.debitAccount = event.detail.value;
  }

  onSearchChange( event ) {
    //buscar la cuenta amiga
    console.log(event.detail.value);
    this.accounts = this.infoService.getAccounts( event.detail.value );
  }

  ngOnInit() {
    this.userService.getCurrentUser().then((user: User) => {
      if (user) {
        this.infoService.getAccountStatus(user.Correo).subscribe(resp => {
          this.userAccounts = [];
          this.userAccounts.push(...resp);
        });
      }
    });
  }

}
