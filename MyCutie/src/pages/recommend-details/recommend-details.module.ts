import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecommendDetailsPage } from './recommend-details';

@NgModule({
  declarations: [
    RecommendDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(RecommendDetailsPage),
  ],
})
export class RecommendDetailsPageModule {}
