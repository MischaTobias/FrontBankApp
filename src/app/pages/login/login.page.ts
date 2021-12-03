import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = new User();

  constructor( private router: Router,
               private userService: UserService,
               private toastCtrl: ToastController ) { }

  ngOnInit() {
  }

  onSubmit( form: NgForm ) {
    if ( form.status === 'INVALID') {
      this.presentToast('Invalid Information', 'danger');
      return;
    }

    if (this.user) {
      this.userService.setCurrentUser( this.user );
      this.presentToast('Succesful Login', 'success');
      this.router.navigate(['/account-status']);
    }
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
