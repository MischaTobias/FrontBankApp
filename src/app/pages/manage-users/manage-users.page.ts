/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { SettingsPage } from '../settings/settings.page';
import { InfoBancoService } from '../../services/info-banco.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss'],
})
export class ManageUsersPage implements OnInit {

  appUsers: User[] = [];

  constructor( private userService: UserService,
               private router: Router,
               private infoService: InfoBancoService,
               private toastCtrl: ToastController,
               private modalCtrl: ModalController ) { }

  ngOnInit() {
    this.infoService.getUsers().subscribe(resp => {
      if (this.appUsers.length === 0) {
        this.appUsers.push(...resp);
      }
    });
  }

  async modifyAccount( userId: number ) {
    //enviar el id para la página de modificación
    const modal = await this.modalCtrl.create({
      component: SettingsPage,
      componentProps: {
        user: this.appUsers[userId - 1],//obtenerUserPorId
        title: 'Modify user',
        buttonText: 'Save changes'
      }
    });
    await modal.present();
  }

  async addNewUser() {
    const modal = await this.modalCtrl.create({
      component: SettingsPage,
      componentProps: {
        user: new User(),//obtenerUserPorId
        title: 'Create new user',
        buttonText: 'Create user',
        source: 'CreateNewUser'
      }
    });
    await modal.present();
  }

  ionViewWillEnter() {
    this.infoService.getUsers().subscribe(resp => {
      if (this.appUsers.length === 0) {
        this.appUsers.push(...resp);
      }
    });
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
