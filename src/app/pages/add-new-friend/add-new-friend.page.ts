import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { friendAccount } from 'src/app/interfaces/interfaces';
import { InfoBancoService } from 'src/app/services/info-banco.service';

@Component({
  selector: 'app-add-new-friend',
  templateUrl: './add-new-friend.page.html',
  styleUrls: ['./add-new-friend.page.scss'],
})
export class AddNewFriendPage implements OnInit {

  accounts: friendAccount[] = [];

  constructor( private modalCtrl: ModalController,
               private infoBancoService: InfoBancoService ) { }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  addAccount( accountNumber: string ) {
    //add acount
    this.dismissModal();
  }

  onSearchChange( event ) {
    //buscar la cuenta amiga
    console.log(event.detail.value);
    this.accounts = this.infoBancoService.getAccounts( event.detail.value );
  }

  ngOnInit() {
  }

}
