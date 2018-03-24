import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {DataProvider} from '../../providers/data/data';
import {DataDisplayPage} from '../data-display/data-display';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit{

  selectedGrouping;
  selectedGroup;
  content;
  dateFrom: Date;
  dateTo: Date;
  dateFromSelected;
  dateToSelected;
  dataReady = false;
  dataDisplayPage = DataDisplayPage;

  constructor(public navCtrl: NavController, private provider: DataProvider) {
  }

  // isDataReady() {
  //   this.provider.isDataReady().subscribe(
  //     data => {
  //       this.dataReady = data;
  //       if (!this.dataReady) {
  //         this.navCtrl.navigateByUrl('/dataNotReady');
  //       }
  //     }, error2 => alert(error2.message))
  // }

  groupingSelected(e) {
    this.selectedGroup = '';
    if (e === 'All') {this.selectedGroup = e}
    this.selectedGrouping = e;
    if (e == 'Index') {
      this.provider.getIndices().subscribe(content => this.content = content);
    }else if (e == 'Sector') {
      this.provider.getSectors().subscribe(content => this.content = content);
    }else {
      this.content = [];
    }
  }


  groupSelected(e) {
    if(e !== '' || e !== undefined) {
      this.selectedGroup = e;
    }
  }

  post() {
    sessionStorage.setItem('super', this.selectedGroup);
    sessionStorage.setItem('superType', this.selectedGroup);
    if(this.dateFrom) {
      this.dateFrom = new Date(this.dateFrom);
      this.dateFromSelected = this.dateFrom.toISOString();
      sessionStorage.setItem('from', this.dateFromSelected);
    }
    if(this.dateTo) {
      this.dateTo = new Date(this.dateTo);
      this.dateToSelected = this.dateTo.toISOString();
      sessionStorage.setItem('to', this.dateToSelected);
    }

    this.navCtrl.push(this.dataDisplayPage);

    console.log(this.selectedGrouping);
    console.log(this.selectedGroup);
    console.log(this.dateFromSelected);
    console.log(this.dateToSelected);
  }



  ngOnInit(){
    sessionStorage.clear();
  }


}


