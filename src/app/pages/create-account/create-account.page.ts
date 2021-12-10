/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  @Input() user: User;
  @Input() title: string;
  @Input() amountTitle: string;
  @Input() btnTitle: string;
  @Input() accountId: number = 0;
  initialAmount: number = null;

  constructor( private modalCtrl: ModalController,
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

    console.log(this.initialAmount);
    console.log(this.accountId);

    if (this.accountId === 0) {
      //crear cuenta
      console.log(this.user);
      this.dismissModal();
      return;
    }

    //depositar a cuenta
    console.log(this.user);
    console.log(this.accountId);
    this.dismissModal();
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
