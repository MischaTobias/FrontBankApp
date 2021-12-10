/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Account, AccountSearchFriend, User , Relationships} from 'src/app/interfaces/interfaces';
import { InfoBancoService } from 'src/app/services/info-banco.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-new-friend',
  templateUrl: './add-new-friend.page.html',
  styleUrls: ['./add-new-friend.page.scss'],
})
export class AddNewFriendPage implements OnInit {

  accounts: AccountSearchFriend[] = [];
  userAccounts: Account[] = [];
  debitAccount: number = 0;
  AccFriendNow: Relationships[] = [];

  constructor( private modalCtrl: ModalController,
               private infoService: InfoBancoService,
               private userService: UserService,
               private toastCtrl: ToastController ) { }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  addAccount( accountNumber: number ) {
    //add acount
    if (this.debitAccount === 0) {
      this.presentToast('Please select an origin account', 'danger');
      return;
    }
    this.postAccountsFriendsAdd(Number(this.debitAccount),accountNumber);
    this.dismissModal();
  }

  postAccountsFriendsAdd(origenA: number, destinoA: number){
    this.AccFriendNow = [
      {
        cuentaOrigen : origenA,
        cuentaDestino : destinoA
      }
    ];
    //console.log(this.AccFriendNow[0]);
    this.infoService.postAccountsFriends(this.AccFriendNow[0]);
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
    if (event.detail.value.length === 8) {
      this.infoService.getAllAccountsFriends(event.detail.value).subscribe(resp => {
        this.accounts = [];
        this.accounts.push(...resp);
        ///console.log(this.accounts[0].idCuenta);
      });
    }
    //console.log(event.detail.value);
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
