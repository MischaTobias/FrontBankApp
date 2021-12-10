/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Account, User } from 'src/app/interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { CreateAccountPage } from '../create-account/create-account.page';
import { InfoBancoService } from 'src/app/services/info-banco.service';
import { HistoryB, Relationships } from '../../interfaces/interfaces';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  @Input() user: User;
  @Input() title: string;
  @Input() buttonText: string;
  @Input() source: string;
  isAvailable = false;
  isAdmin = false;
  HistoryNow: HistoryB[] = [];
  AccNow: Account[] = [];
  idUser: number = 0;
  accountMon: number = 0;
  accountAho: number = 0;
  AccFriendNow: Relationships[] = [];
  userAccounts: Account[] = [];

  constructor( private userService: UserService,
               private router: Router,
               private toastCtrl: ToastController,
               private modalCtrl: ModalController,
               private infoBancoService: InfoBancoService ) { }

  ngOnInit() {
    this.userService.getCurrentUser().then((user: User) => {
      this.isAvailable = user.Disponible === 1;
      this.isAdmin = user.Rol === 'admin';
    });
    //obtener id del usuario
    this.getId();
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  async addMoneyToAccount( accountId: number , amountNow: number) {
    const modal = await this.modalCtrl.create({
      component: CreateAccountPage,
      componentProps: {
        user: new User(),//obtenerUserPorId
        title: `Deposit to ${ accountId }`,
        accountId,
        amountNow,
        amountTitle: 'Amount to deposit',
        btnTitle: 'Deposit'
      }
    });
    await modal.present();
  }

  async onSubmit( form: NgForm ) {
    //modificar al usuario
    //si el usuario tiene idUsuario, modificar al usuario respectivo
    //si no tiene idUsuario, crear el usuario

    if ( form.status === 'INVALID' ) {
      await this.presentToast('Invalid Information, please try again', 'danger');
    }

    this.user.Disponible = this.isAvailable ? 1 : 0;

    if (this.user.idUsuario) {
      //Modificar usuario existente
      //this.infoBancoService.modifyUser( this.user );
      this.dismissModal();
      return;
    }
    //datos predeterminados para creacion de usuario
    this.user.Rol = "Normal";
    this.user.Disponible = 1;
    this.createAccRandom();
    this.createAccRandom2();
    //Crear un nuevo usuario
    this.infoBancoService.postNewUser( this.user );
    //Guardar historial la creacion
    this.postHistoryUser("Crea Usuario","Se creo el usuario " + this.user.Nombre);
    //crear cuenta monetaria
    this.postCreateAccount("monetaria",1000,this.accountMon,this.idUser+1);
    //crear cuenta ahorro
    this.postCreateAccount("ahorro",0,this.accountAho,this.idUser+1);
    //crear relacion cuentas
    this.postFriendAccount(this.accountMon,this.accountAho);
    this.postHistoryUser("Relacion Cuenta","Se relaciono cuenta " + this.accountMon + " " + this.accountAho);
    this.postFriendAccount(this.accountAho,this.accountMon);
    this.postHistoryUser("Relacion Cuenta","Se relaciono cuenta " + this.accountAho + " " + this.accountMon);
    this.dismissModal();
    window.location.reload();
  }

  createAccRandom(){
    this.accountAho = Math.floor(10000000 + Math.random() * 90000000);
  }

  createAccRandom2(){
    this.accountMon = Math.floor(10000000 + Math.random() * 90000000);
  }

  getId(){
    this.infoBancoService.getIdUser().subscribe(resp => {
      this.idUser = resp[0].idUsuario;
    });
  }

  postHistoryUser(type: string,description: string){
    const date = new Date();
    this.HistoryNow = [
      {
        tipoTransaccion: type,
        fechaYHora: date.toISOString(),
        descripcion: description
      }
    ];
    //console.log(this.HistoryNow[0]);
    this.infoBancoService.postHistoryUser(this.HistoryNow[0]);
  }

  postCreateAccount(type: string, amount: number, id: number, owner: number){
    this.AccNow = [
      {
        idCuenta : id,
        TipoCuenta : type,
        MontoActual : amount,
        Propietario : owner
      }
    ];
    //console.log(this.AccNow[0]);
    this.infoBancoService.postCreateAccount(this.AccNow[0]);
  }

  postFriendAccount(origenA: number, destinoA: number){
    this.AccFriendNow = [
      {
        cuentaOrigen : origenA,
        cuentaDestino : destinoA
      }
    ];
    //console.log(this.AccFriendNow[0]);
    this.infoBancoService.postAccountsFriends(this.AccFriendNow[0]);
  }
  
  async addNewAccount() {
    const modal = await this.modalCtrl.create({
      component: CreateAccountPage,
      componentProps: {
        user: new User(),//obtenerUserPorId
        title: 'Create new savings account',
        amountTitle: 'Initial amount',
        btnTitle: 'Create account'
      }
    });
    await modal.present();
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
      this.isAvailable = this.user.Disponible === 1;
      this.isAdmin = user.Rol === 'admin';

      //ir a traer la lista de cuentas de la persona
      this.infoBancoService.getAccountStatus(user.Correo).subscribe(resp => {
        this.userAccounts.push(...resp);
      });
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
