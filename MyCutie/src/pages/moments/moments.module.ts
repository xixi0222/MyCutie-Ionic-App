import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MomentsPage } from './moments';

@NgModule({
  declarations: [
    MomentsPage,
  ],
  imports: [
    IonicPageModule.forChild(MomentsPage),
  ],
})
export class MomentsPageModule {}
