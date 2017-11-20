import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth'

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, private afauth: AngularFireAuth, private app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
  }

  goToVisitor(){
    this.view.dismiss()
    this.navCtrl.setRoot('LoginPage')
    // this.app.getRootNavById('LoginPage')
  }

  logout(){
    this.view.dismiss()

    this.afauth.auth.signOut().then((res)=> {
      this.navCtrl.setRoot(HomePage)
    }).catch(err=> {
      alert(err.message)
    })
    

  }

}
