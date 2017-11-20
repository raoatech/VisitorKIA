import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminDashPage } from './admin-dash';

@NgModule({
  declarations: [
    AdminDashPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminDashPage),
  ],
  exports: [
    AdminDashPage
  ]
})
export class AdminDashPageModule {}
