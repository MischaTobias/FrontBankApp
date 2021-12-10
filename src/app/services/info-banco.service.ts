/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Account, HistoryAdmin, HistoryNormal, AccountFriend, TransferA, AccountPut, HistoryA, IdTransfer } from '../interfaces/interfaces';
import { User } from 'src/app/interfaces/interfaces';

const URL = environment.url;
const VERSION = environment.version;

@Injectable({
  providedIn: 'root'
})
export class InfoBancoService {

  constructor(private http: HttpClient) { }

  //METODOS GET

  getCheckLogin(email: string){
    const query = `/usuario/${email}`;
    return this.queryGet<any>(query);
  }

  getAccountStatus(email: string){
    const query = `/cuenta/${email}`;
    return this.queryGet<Account[]>(query);
  }

  getHistoryAdmin(){
    const query = `/historial`;
    return this.queryGet<HistoryAdmin[]>(query);
  }

  getHistoryAdmin2(){
    const query = `/historial2`;
    return this.queryGet<HistoryNormal[]>(query);
  }

  getHistoryNormal(email: string){
    const query = `/historial/${email}`;
    return this.queryGet<HistoryNormal[]>(query);
  }

  getUserInfo(email: string){
    const query = `/usuarioInfo/${email}`;
    return this.queryGet<User[]>(query);
  }

  getAccountsFriends(account: number){
    const query = `/relacionCuenta/${account}`;
    return this.queryGet<AccountFriend[]>(query);
  }

  getIdTransfer(){
    const query = `/tranferencia`;
    return this.queryGet<IdTransfer>(query);
  }

  createNewUser( user: User ) {
    console.log( user );
  }

  modifyUser( user: User ) {
    console.log( user );
  }

  //METODOS POST

  postTransfer(body: TransferA){
    const query = `/tranferencia`;
    return this.queryPost(query, body);
  }

  postHistory(body: HistoryA){
    const query = `/historial2`;
    return this.queryPost(query, body);
  }

  //METODOS PUT

  putAccount(account: number, body: AccountPut){
    const query = `/cuenta/${account}`;
    return this.queryPut(query, body);
  }

  //METODOS GENERICOS

  private queryGet<T>(query: string){
    query = URL + VERSION + query;
    return this.http.get<T>(query);
  }

  private queryPost<T>(query: string, body: any){
    query = URL + VERSION + query;
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
         });

    let options = {
      headers: httpHeaders
         };
    return this.http.post<T>(query,body,options).subscribe(res => {
        //console.log(res);
      },
      err => {
        //console.log(err);
      }
    );
  }

  private queryPut<T>(query: string, body: any){
    query = URL + VERSION + query;
    return this.http.put<T>(query,body).subscribe(res => {
      //console.log(res);
      },
      err => {
      //console.log(err);
      }
      );
  }
}
