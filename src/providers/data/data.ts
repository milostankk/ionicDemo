import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpParams} from '@angular/common/http';

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

  getChart(endPoint, superName, from?, to?, optional?) {
    let queryParams: HttpParams = new HttpParams();
    queryParams = queryParams.append('super', superName);
    if (from) {
      queryParams = queryParams.append('from', from);
    }
    if (to) {
      queryParams = queryParams.append('to', to);
    }
    if (optional) {
      queryParams = queryParams.append(optional.param, optional.value)
    }

    return this.http.get(this.apiUrl + endPoint, {params: queryParams});
  }

  // getPlotSectorStrength(index, sector, from?, to?) {
  //   let queryParams: HttpParams = new HttpParams();
  //   queryParams = queryParams.append('index', index);
  //   queryParams = queryParams.append('sector', sector);
  //   if (from) {
  //     queryParams = queryParams.append('from', from);
  //   }
  //   if (to) {
  //     queryParams = queryParams.append('to', to);
  //   }
  //
  //   return this.http.get(this.rootUrl + '/PlotSectorStrength', {params: queryParams});
  // }

}
