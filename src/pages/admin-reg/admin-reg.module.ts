import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminRegPage } from './admin-reg';

@NgModule({
  declarations: [
    AdminRegPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminRegPage),
  ],
  exports: [
    AdminRegPage
  ]
})
export class AdminRegPageModule {}
