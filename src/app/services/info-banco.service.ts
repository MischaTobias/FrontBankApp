import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  //METODOS GENERICOS

  private queryGet<T>(query: string){
    query = URL + VERSION + query;
    return this.http.get<T>(query);
  }

  private queryPost<T>(query: string, body: any[]){
    query = URL + VERSION + query;
    return this.http.post<T>(query,body);
  }

  private queryPut<T>(query: string, body: any[]){
    query = URL + VERSION + query;
    return this.http.put<T>(query,body);
  }

  //METODOS POST

  postTransfer(body: TransferA[]){
    const query = `/transferencia`;
    return this.queryPost(query,body);
  }

  postHistory(body: HistoryA[]){
    const query = `/historial`;
    return this.queryPost(query,body);
  }

  //METODOS PUT

  putAccount(account: number, body: AccountPut[]){
    const query = `/cuenta/${account}`;
    return this.queryPut(query,body);
  }


}
