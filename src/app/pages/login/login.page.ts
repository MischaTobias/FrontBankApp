import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { InfoBancoService } from '../../services/info-banco.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = new User();

  constructor( private router: Router,
               private userService: UserService,
               private infoService: InfoBancoService,
               private toastCtrl: ToastController ) { }

  ngOnInit() {
  }

  onSubmit( form: NgForm ) {
    if ( form.status === 'INVALID') {
      this.presentToast('Invalid Information', 'danger');
      return;
    }

    this.infoService.getCheckLogin(this.user.Correo).subscribe(resp => {
      //null?
      if (resp.length === 0) {
        this.presentToast('Invalid email', 'danger');
      }
      else if (resp[0].password === this.user.Contrasena) {
        this.getInfoUser();
        if (this.user.Disponible === 1) {
          this.userService.setCurrentUser( this.user );
          this.presentToast('Succesful Login', 'success');
          this.router.navigate(['/account-status']);
        }
        if (this.user.Disponible === 0) {
          this.presentToast('Account not available', 'danger');
        }
      }else{
        this.presentToast('Error in login', 'danger');
      }
    });
  }

  keyDownFunction( event, form ) {
    if (event.keyCode === 13) {
      this.onSubmit( form );
    }
  }

  getInfoUser(){
    this.infoService.getUserInfo(this.user.Correo).subscribe(resp => {
      this.user = resp[0];
      this.userService.setCurrentUser(this.user);
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
