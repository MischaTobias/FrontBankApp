import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  @Input() prevUser: User;
  newUser: User = new User();
  isAvailable = false;

  constructor( private userService: UserService,
               private router: Router,
               private toastCtrl: ToastController,
               private modalCtrl: ModalController ) { }

  ngOnInit() {
    this.isAvailable = this.prevUser.Disponible === 1;
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  onSubmit( form: NgForm ) {
    //modificar al usuario
    this.dismissModal();
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
