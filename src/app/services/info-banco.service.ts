import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const URL = environment.url;
const VERSION = environment.version;

@Injectable({
  providedIn: 'root'
})
export class InfoBancoService {

  constructor(private http: HttpClient) { }

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

  getCheckLogin(email: string){
    const query = `/usuario/${email}`;
    return this.queryGet<any>(query);
  }


}
