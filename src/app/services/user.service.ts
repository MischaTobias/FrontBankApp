import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private storage: Storage) {
    this.startStorage();
  }

  async startStorage() {
    await this.storage.create();
  }

  async setCurrentAccount( accountId: number ) {
    await this.storage.set('currentAccount', accountId);
  }

  async deleteCurrentAccount() {
    await this.storage.remove('currentAccount');
  }

  async setCurrentUser( user: User ) {
    user.Contrasena = null;
    await this.storage.set('currentUser', user);
  }

  async getCurrentUser() {
    return await this.storage.get('currentUser');
  }

  async logOut() {
    await this.storage.remove('currentUser');
  }
}
