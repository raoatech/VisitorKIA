import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-visitor-details',
  templateUrl: 'visitor-details.html',
})
export class VisitorDetailsPage {

  data: any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data =  this.navParams.get('data')

    console.log(this.data)
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitorDetailsPage');

    
  }


  

}
