import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Account, Transfer, User } from 'src/app/interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { InfoBancoService } from '../../services/info-banco.service';
import { AccountFriend, TransferA, AccountPut, HistoryA, IdTransfer } from '../../interfaces/interfaces';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit {

  userAccounts: Account[] = [];
  debitAccount: number = 0;
  creditAccount: number = 0;
  accountFriends: AccountFriend[] = [];
  amount: number = null;
  flag_amount: boolean = false;
  message = '';
  credit: number = null;

  //arrays post
  amountNow: number = 0.00;
  TransferNow: TransferA[] = [];
  AccountNow: AccountPut[] = [];
  HistoryNow: HistoryA[] = [];
  idTransfer: number = 0;

  constructor( private userService: UserService,
               private router: Router,
               private infoService: InfoBancoService,
               private toastCtrl: ToastController ) { }

  ngOnInit() {
    this.userService.getCurrentUser().then((user: User) => {
      if (user) {
        this.infoService.getAccountStatus(user.Correo).subscribe(resp => {
          this.userAccounts = [];
          this.userAccounts.push(...resp);
        });
      }
    });
  }

  changeDebitAccount( event ) {
    this.credit = null;
    this.debitAccount = event.detail.value;
    this.infoService.getAccountsFriends(event.detail.value).subscribe(resp => {
      this.accountFriends = [];
      this.accountFriends.push(...resp);
    });
  }

  changeCreditAccount( event ) {
    this.creditAccount = event.detail.value;
  }

  onSubmit( form: NgForm ) {
    if ( form.status === 'INVALID') {
      this.presentToast('Invalid Information', 'danger');
      return;
    }

    this.userAccounts.forEach(element => {
      if (element.idCuenta == this.debitAccount) {
        if (element.MontoActual >= this.amount) {
          this.flag_amount = true;
        }
      }
    });

    if (this.flag_amount) {
      this.flag_amount = false;
      //debit
      this.postTransfer(this.amount,1,this.debitAccount,this.creditAccount);
      this.getId();
      this.postHistory(this.idTransfer);
      this.putAccount('r',this.debitAccount);
      //credit
      this.postTransfer(this.amount,2,this.creditAccount,this.debitAccount);
      this.postHistory(this.idTransfer+1);
      this.putAccount('s',this.creditAccount);

      this.presentToast('Valid transfer', 'success');
    }else{
      this.presentToast('Invalid amount', 'danger');
    }

  }

  getId(){
    this.infoService.getIdTransfer().subscribe(resp => {
      this.idTransfer = resp[0].idTransferencias;
      console.log(this.idTransfer);
    });
  }

  postTransfer(montoA: number, accionA: number, origenA: number, destinoA: number){
    this.TransferNow = [
      {
        monto : montoA,
        accion : accionA,
        cuentaOrigen : origenA,
        cuentaDestino : destinoA
      }
    ]
    console.log(this.TransferNow[0]);
    //this.infoService.postTransfer(this.TransferNow);
  }

  postHistory(id: number){
    let date = new Date();
    console.log(date.toISOString());
    console.log(id);
    this.HistoryNow = [
      {
        FechaYHora: date,
        Transferencia: id,
        Descripcion: this.message
      }
    ]
    console.log(this.HistoryNow[0]);
    //this.infoService.postHistory(this.HistoryNow);
  }

  putAccount(op: string, acco : number){
    //suma o resta dependiendo de la cuenta
    if (op === 's') {
      this.userAccounts.forEach(element => {
        if (element.idCuenta == this.creditAccount) {
          this.amountNow = element.MontoActual + this.amount;
        }
      });
      console.log(this.creditAccount + ' = ' + this.amountNow.toFixed(2));
    }else{
      this.userAccounts.forEach(element => {
        if (element.idCuenta == this.debitAccount) {
          this.amountNow = element.MontoActual - this.amount;
        }
      });
      console.log(this.debitAccount + ' = ' + this.amountNow.toFixed(2));
    }
    //arreglo formato para 2 decimales
    this.amountNow = Number(this.amountNow.toFixed(2));
    this.AccountNow = [{
      MontoActual : this.amountNow
    }]
    console.log(this.AccountNow[0]);
    //this.infoService.putAccount(acco,this.AccountNow);
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
