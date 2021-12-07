import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Componente, User } from './interfaces/interfaces';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  componentes: Observable<Componente[]>;
  isAdmin = false;
  currentUser: User;

  constructor( private dataService: DataService,
               private router: Router,
               private userService: UserService ) {
  }

  async ngOnInit() {
    await this.checkUser();
    this.componentes = this.dataService.getMenuOpts();
    this.checkRouter();
  }

  checkRouter() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.checkUser();
      }
    });
  }

  async checkUser() {
    this.userService.getCurrentUser().then(user => {
      if (user) {
        this.currentUser = user[0];
        this.isAdmin = this.currentUser.Rol === 'admin';
      }
    });
  }
}
