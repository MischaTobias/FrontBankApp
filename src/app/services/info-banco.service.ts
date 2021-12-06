import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Account, HistoryNormal } from '../interfaces/interfaces';
import { User } from 'src/app/interfaces/interfaces';

const URL = environment.url;
const VERSION = environment.version;

@Injectable({
  providedIn: 'root'
})
export class InfoBancoService {

  constructor(private http: HttpClient) { }

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

  //METODOS GET

  getCheckLogin(email: string){
    const query = `/usuario/${email}`;
    return this.queryGet<any>(query);
  }

  getAccountStatus(email: string){
    const query = `/cuenta/${email}`;
    return this.queryGet<Account>(query);
  }

  getHistoryAdmin(){
    const query = `/historial`;
    return this.queryGet<Account>(query);
  }

  getHistoryNormal(email: string){
    const query = `/historial/${email}`;
    return this.queryGet<HistoryNormal>(query);
  }

  getUserInfo(email: string){
    const query = `/usuarioInfo/${email}`;
    return this.queryGet<User>(query);
  }

    //METODOS POST


    //METODOS PUT


}
