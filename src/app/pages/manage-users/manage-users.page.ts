/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { SettingsPage } from '../settings/settings.page';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss'],
})
export class ManageUsersPage implements OnInit {

  appUsers: User[] = [
    {
      idUsuario: 1,
      Nombre: 'Neto',
      Correo: 'neto@gmail.com'
    },
    {
      idUsuario: 2,
      Nombre: 'Aylinne',
      Correo: 'aylinne@gmail.com'
    },
    {
      idUsuario: 3,
      Nombre: 'Mansi',
      Correo: 'mansi@gmail.com'
    },
    {
      idUsuario: 4,
      Nombre: 'Diego',
      Correo: 'diego@gmail.com'
    },
  ];

  constructor( private userService: UserService,
               private router: Router,
               private toastCtrl: ToastController,
               private modalCtrl: ModalController ) { }

  ngOnInit() {
  }

  async modifyAccount( userId: number ) {
    //enviar el id para la página de modificación
    const modal = await this.modalCtrl.create({
      component: SettingsPage,
      componentProps: {
        prevUser: new User()//obtenerUserPorId
      }
    });
    await modal.present();
  }

  ionViewWillEnter() {
    this.userService.getCurrentUser().then((user: User) => {
      if (!user) {
        this.presentToast('Please sign in', 'danger');
        this.userService.logOut();
        this.router.navigate(['/login']);
      } else if (user.Rol !== 'admin') {
        this.presentToast('You don\'t have the permission for that', 'danger');
        this.router.navigate(['/account-status']);
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
