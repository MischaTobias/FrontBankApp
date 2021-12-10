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
  userGo: User = new User();

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
    this.SearchUser(userId);
    //enviar el id para la página de modificación
    const modal = await this.modalCtrl.create({
      component: SettingsPage,
      componentProps: {
        user: this.userGo,
        title: 'Modify user',
        buttonText: 'Save changes',
        read: true  
      }
    });
    await modal.present();
  }

  SearchUser(userId: number ){
    this.appUsers.forEach(element => {
      if (element.idUsuario == userId) {
        this.userGo = element;
        return;
      }
    });
  }

  async addNewUser() {
    const modal = await this.modalCtrl.create({
      component: SettingsPage,
      componentProps: {
        user: new User(),//obtenerUserPorId
        title: 'Create new user',
        buttonText: 'Create user',
        source: 'CreateNewUser',
        read: false
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
