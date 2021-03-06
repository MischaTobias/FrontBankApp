/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interfaces';
import { InfoBancoService } from '../../services/info-banco.service';
import { AccountPut, Account } from '../../interfaces/interfaces';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  @Input() user: number;
  @Input() title: string;
  @Input() amountTitle: string;
  @Input() btnTitle: string;
  @Input() accountId: number = 0;
  @Input() amountNow: number = 0;
  initialAmount: number = null;
  AccountNow: AccountPut[] = [];
  userAccounts: Account[] = [];
  AccNow: Account[] = [];
  accountAho: number = 0;

  constructor( private modalCtrl: ModalController,
               private infoService: InfoBancoService,
               private toastCtrl: ToastController ) { }

  ngOnInit() {
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  async onSubmit( form: NgForm ) {
    //crear cuenta para el user que nos envíen
    if ( form.status === 'INVALID' ) {
      await this.presentToast('Invalid Information, please try again', 'danger');
    }

    if (this.accountId === 0) {
      //crear cuenta
      this.accountAho = Math.floor(10000000 + Math.random() * 90000000);
      this.postCreateAccount("ahorro",this.initialAmount,this.accountAho,this.user);
      this.dismissModal();
      window.location.reload();
      return;
    }

    //depositar a cuenta
    this.putAccount(this.accountId);
    this.dismissModal();
    window.location.reload();
  }

  postCreateAccount(type: string, amount: number, id: number, owner: number){
    this.AccNow = [
      {
        idCuenta : id,
        TipoCuenta : type,
        MontoActual : amount,
        Propietario : owner
      }
    ];
    //console.log(this.AccNow[0]);
    this.infoService.postCreateAccount(this.AccNow[0]);
  }

  putAccount(acco: number) {
    //suma a la cuenta
    this.initialAmount = this.amountNow + this.initialAmount;
    //arreglo formato para 2 decimales
    this.initialAmount = Number(this.initialAmount.toFixed(2));
    this.AccountNow = [{
      MontoActual : this.initialAmount
    }];
    //console.log(this.AccountNow[0]);
    this.infoService.putAccount(acco,this.AccountNow[0]);
  }

  keyDownFunction( event, form ) {
    if (event.keyCode === 13) {
      this.onSubmit( form );
    }
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
