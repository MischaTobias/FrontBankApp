import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-new-friend',
  templateUrl: './add-new-friend.page.html',
  styleUrls: ['./add-new-friend.page.scss'],
})
export class AddNewFriendPage implements OnInit {

  accounts = [
    {
      user: 'Mischa',
      accountNo: '849849-65498'
    },
    {
      user: 'Hola',
      accountNo: '8498asdfa5498'
    },
  ];

  constructor( private modalCtrl: ModalController ) { }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  addAccount( accountNumber: string ) {
    //add acount
    this.dismissModal();
  }

  onSearchChange( event ) {
    //buscar la cuenta amiga
  }

  ngOnInit() {
  }

}
