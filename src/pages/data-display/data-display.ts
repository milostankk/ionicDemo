import {Component, OnDestroy} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as HighCharts from 'highcharts';
import {DataProvider} from '../../providers/data/data';

/**
 * Generated class for the DataDisplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-data-display',
  templateUrl: 'data-display.html',
})
export class DataDisplayPage implements OnDestroy{

  title;
  latestDateInSeries;
  endpoints = [
    {endPoint: '/GetMaDigest', title: 'Diffusion 10', optional: {param: 'maLength', value: '10'}},
    {endPoint: '/GetMaDigest', title: 'Diffusion 20', optional: {param: 'maLength', value: '20'}},
    {endPoint: '/GetMaDigest', title: 'Diffusion 50', optional: {param: 'maLength', value: '50'}},
    {endPoint: '/GetMaDigest', title: 'Diffusion 200', optional: {param: 'maLength', value: '200'}},
    {endPoint: '/GetRss', title: 'RSS'},
    {endPoint: '/GetRsStrongRsWeak', title: 'RS Strong/Weak'},
    {endPoint: '/GetDomDoe', title: 'DOM/DOE'},
    {endPoint: '/GetSuper', title: 'Super Group'}];

  constructor(public navCtrl: NavController, public navParams: NavParams, private provider: DataProvider) {
    this.title = sessionStorage.getItem('super');
  }


 mapCharts(endpoints) {
    const self = this;
    endpoints.forEach(function (ep) {
     self.provider.getChart(ep.endPoint, sessionStorage.getItem('super'), sessionStorage.getItem('from'),
       sessionStorage.getItem('to'), ep.optional).subscribe(data => {
       const res: any = data;
       const self = this;
       const series: any[] = [];
       for (const quant of res[0].Quantities) {
         series.push({
           showInLegend: true,
           name: quant.Type,
           data: res.map(function (point) {
             return [Date.parse(point.Date), point.Quantities[res[0].Quantities.indexOf(quant)]['Value']]
           }),
         })
       }
       let chart = HighCharts.chart(ep.title, {
         chart: {
           reflow: false,
           name: ep.title,
           renderTo: ep.title,
           zoomType: 'x'
         },
         title: {text: ep.title},
         series: series,
         xAxis: {
           events: {
              afterSetExtremes: function (e) {
                if (e.dontPropagate) {
                  return;
                }
                const data = e.target.series[0].points;
                 this.latestDateInSeries = new Date(data[data.length - 1].x);
                if ((e.min && e.max)) {
                  let ind = 0;
                  HighCharts.charts.forEach(chart => {
                    if (e.userMin || e.userMax) {
                      chart.showResetZoom();
                    }
                    if (ind !== e.target.chart.index) {
                      chart.xAxis[0].setExtremes(e.min, e.max, undefined, undefined, {dontPropagate: true});
                    }
                    ind++;
                  });


                  // this.dataService.getSymbolGrid(sessionStorage.getItem('super'),
                  //   this.latestDateInSeries.toISOString()).subscribe(sym => this.symbolGrid = sym);
                  //
                  //
                  // if (this.superType !== 'Sector') {
                  //   this.dataService.getSectorGrid(sessionStorage.getItem('super'),
                  //     this.latestDateInSeries.toISOString()).subscribe(sym => this.sectorGrid = sym);
                  // }
                }
              }
           },
           type: 'datetime',
           ordinal: false,
           labels: {
             format: '{value:%Y-%b-%e}'
           },
           dateTimeLabelFormats: {
             minute: '%H:%M',
             hour: '%H:%M',
             day: '%e. %b',
             month: '%b \'%y',
             year: '%Y'
           }
         }
       })
     })
   })
 }

  ionViewDidLoad() {
    this.mapCharts(this.endpoints);
  }

  ngOnDestroy() {
    for (let ind = HighCharts.charts.length - 1; ind >= 0; ind--) {
      HighCharts.charts.splice(ind, 1);
    }
  }

}
