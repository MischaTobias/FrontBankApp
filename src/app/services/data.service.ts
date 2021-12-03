import { Injectable } from '@angular/core';
import { Componente } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  componentes: Componente[] = [];

  constructor( private http: HttpClient ) { }

  getMenuOpts() {
    return this.http.get<Componente[]>('/assets/data/menu-opts.json');
  }
}
