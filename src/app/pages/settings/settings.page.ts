/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Account, User } from 'src/app/interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { CreateAccountPage } from '../create-account/create-account.page';
import { InfoBancoService } from 'src/app/services/info-banco.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  @Input() user: User;
  @Input() title: string;
  @Input() buttonText: string;
  @Input() source: string;
  isAvailable = false;
  isAdmin = false;

  userAccounts: Account[] = [
    {
      idCuenta: 1,
      MontoActual: 10
    },
    {
      idCuenta: 2,
      MontoActual: 20
    },
    {
      idCuenta: 3,
      MontoActual: 30
    },
  ];

  constructor( private userService: UserService,
               private router: Router,
               private toastCtrl: ToastController,
               private modalCtrl: ModalController,
               private infoBancoService: InfoBancoService ) { }

  ngOnInit() {
    this.userService.getCurrentUser().then((user: User) => {
      this.isAvailable = user.Disponible === 1;
      this.isAdmin = user.Rol === 'admin';
    });
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  async addMoneyToAccount( accountId: number ) {
    const modal = await this.modalCtrl.create({
      component: CreateAccountPage,
      componentProps: {
        user: new User(),//obtenerUserPorId
        title: `Deposit to ${ accountId }`,
        accountId,
        amountTitle: 'Amount to deposit',
        btnTitle: 'Deposit'
      }
    });
    await modal.present();
  }

  async onSubmit( form: NgForm ) {
    //modificar al usuario
    //si el usuario tiene idUsuario, modificar al usuario respectivo
    //si no tiene idUsuario, crear el usuario

    if ( form.status === 'INVALID' ) {
      await this.presentToast('Invalid Information, please try again', 'danger');
    }

    this.user.Disponible = this.isAvailable ? 1 : 0;

    if (this.user.idUsuario) {
      //Modificar usuario existente
      this.infoBancoService.modifyUser( this.user );
      this.dismissModal();
      return;
    }

    //Crear un nuevo usuario
    this.infoBancoService.createNewUser( this.user );
    this.dismissModal();
  }

  async addNewAccount() {
    const modal = await this.modalCtrl.create({
      component: CreateAccountPage,
      componentProps: {
        user: new User(),//obtenerUserPorId
        title: 'Create new savings account',
        amountTitle: 'Initial amount',
        btnTitle: 'Create account'
      }
    });
    await modal.present();
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
      this.isAvailable = this.user.Disponible === 1;
      this.isAdmin = user.Rol === 'admin';

      //ir a traer la lista de cuentas de la persona
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
