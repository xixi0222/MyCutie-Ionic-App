import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelpmePage } from './helpme';

@NgModule({
  declarations: [
    HelpmePage,
  ],
  imports: [
    IonicPageModule.forChild(HelpmePage),
  ],
})
export class HelpmePageModule {}
