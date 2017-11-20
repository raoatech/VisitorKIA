import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitationPage } from './visitation';

@NgModule({
  declarations: [
    VisitationPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitationPage),
  ],
  exports: [
    VisitationPage
  ]
})
export class VisitationPageModule {}
