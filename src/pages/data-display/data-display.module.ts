import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataDisplayPage } from './data-display';
import {DataProvider} from '../../providers/data/data';

@NgModule({
  declarations: [
    DataDisplayPage,
  ],
  imports: [
    IonicPageModule.forChild(DataDisplayPage),
  ],
  providers: [DataProvider]
})
export class DataDisplayPageModule {}
