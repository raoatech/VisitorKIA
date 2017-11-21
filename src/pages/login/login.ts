import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Platform } from 'ionic-angular';
import { HomePage } from  '../../pages/home/home'
import { AdminProvider } from '../../providers/admin/admin';
import { VisitorProvider } from '../../providers/visitor/visitor'


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  visit: any
  image : any
  data : any = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadCtrl: LoadingController,
     private alertCtrl: AlertController, private visitor: VisitorProvider, private adminPrv:AdminProvider, private plat: Platform) {
      
    }

  ionViewDidLoad() {

    this.adminPrv.getAdminDetails().then(res=> {
      this.data = res
    }).catch(err=> {
      // alert(err.message)
    })

    this.image = this.navParams.get('data')
    console.log('ionViewDidLoad LoginPage');
  }

  register(){
    this.navCtrl.push('RegisterPage')
  }

  checkVisitor() {
    this.navCtrl.push('LogoutPage')
  }

  admin(){
    this.navCtrl.setRoot(HomePage)
  }

  continue() {
    this.navCtrl.push('PhonePage')
  }
}
