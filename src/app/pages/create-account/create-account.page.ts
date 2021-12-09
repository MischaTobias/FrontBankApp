import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  @Input() user: User;
  initialAmount: number = null;

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  changeAccountType( event ) {

  }

  onSubmit( form: NgForm ) {
    //crear cuenta para el user que nos envíen
    this.dismissModal();
  }

  keyDownFunction( event, form ) {
    if (event.keyCode === 13) {
      this.onSubmit( form );
    }
  }

}
