import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { AdminProvider } from '../../providers/admin/admin';
import { AngularFireAuth } from 'angularfire2/auth'
import { VisitorProvider } from '../../providers/visitor/visitor';

/**
 * Generated class for the AdminProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-profile',
  templateUrl: 'admin-profile.html',
})
export class AdminProfilePage {

  data: any = {}
  email = this.afauth.auth.currentUser.email
  imgSrc = "assets/img/profile.png"

  constructor(public navCtrl: NavController, public navParams: NavParams, private afauth: AngularFireAuth, private adminPrv :AdminProvider, private visitPrv: VisitorProvider, private popCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminProfilePage');

    this.adminPrv.getAdminDetails().then(res=> {
      this.data = res
    }).catch(err=> {
      alert(err.message)
    })
  }
  
  editProfile(){
    this.navCtrl.push('EditProfilePage')
  }

  goToVisitor(){
    this.navCtrl.setRoot('LoginPage')
  }

  logout(){
    this.navCtrl.setRoot('LoginPage')
  }

  more(event){
    this.popCtrl.create('MorePage').present({
      ev : event
    })
  }
}
