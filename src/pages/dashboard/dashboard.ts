import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, App } from 'ionic-angular';
import { VisitorProvider } from "../../providers/visitor/visitor";


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  data : any = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadctrl : LoadingController, public alertctrl: AlertController, private visit: VisitorProvider, private app: App) {
  
    this.data = this.navParams.get('data')
    console.log(this.data)
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  logout() {

      const load = this.loadctrl.create({
        content: "Loading",
        duration: 3000
      })

      load.present()

      load.onDidDismiss(()=> {

        this.visit.signOut(this.data.phone).then(res=> {
          console.log(res)
        })

        const alert = this.alertctrl.create({
          title: `Goodbye`,
          message: 'We Hope you come back, Have a lovely day',
          buttons: [{
            text: 'ok',
            handler: ()=> {
            this.navCtrl.push('LoginPage')
            }
          }]

        })

        alert.present()

      })

  }

}
