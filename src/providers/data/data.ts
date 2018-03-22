import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  private apiUrl = 'http://71.183.236.12:8080/RuneFa.JanusWebApiServer/api';

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }
  isDataReady(): Observable<any> {
    return this.http.get(this.apiUrl + '/IsDataReady');
  }

  getIndices(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl.concat('/GetIndexNames'));
  }

  getSectors(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl.concat('/GetSectorNames'));
  }

}
