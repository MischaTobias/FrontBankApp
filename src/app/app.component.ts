import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Componente, User } from './interfaces/interfaces';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';
import { ModalController } from '@ionic/angular';
import { SettingsPage } from './pages/settings/settings.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  componentes: Observable<Componente[]>;
  currentUser: User;
  isAdmin = false;

  constructor( private dataService: DataService,
               private router: Router,
               private userService: UserService,
               private modalCtrl: ModalController ) {
  }

  async ngOnInit() {
    this.checkRouter();
    this.checkUser();
    this.componentes = this.dataService.getMenuOpts();
  }

  async openUserSettings(){
    const modal = await this.modalCtrl.create({
      component: SettingsPage,
      componentProps: {
        user: this.currentUser,
        title: 'Modify user',
        buttonText: 'Save changes',
        source: 'Menu'
      }
    });
    await modal.present();
  }

  menuOpened() {
    this.checkUser();
  }

  checkRouter() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.checkUser();
      }
    });
  }

  checkUser() {
    this.userService.getCurrentUser().then(user => {
      if (user) {
        this.currentUser = user;
        this.isAdmin = this.currentUser.Rol === 'admin';
      }
    });
  }
}
