import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AdminProvider } from '../../providers/admin/admin';
import { VisitorProvider } from '../../providers/visitor/visitor'

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  visit : any

  constructor(public navCtrl: NavController, public navParams: NavParams, private visitor: VisitorProvider, private adminPrv:AdminProvider, private loadCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }


  getPhone(phone) {

    let load = this.loadCtrl.create({
      content: 'Loading..'
    })

    load.present()

    if(phone == null){

      load.dismiss().then(()=> {

        this.alertCtrl.create({
          title:'Warning!',
          message: 'Phone cant be left empty',
          buttons: ['Ok']
        }).present()

      })
    
    }else{ 

        this.visitor.visitIn(phone).then((res: any)=> {

          this.visit = res[0]

          if(this.visit == null ) {

            load.dismiss().then(()=> {
              this.alertCtrl.create({
                title: 'Error',
                message: 'Phone record not found',
                buttons: ['Ok']
              }).present()
            })

          }else{

            let data = {
              data : this.visit
            }

            load.dismiss().then((res)=> {
              this.navCtrl.setRoot('DashboardPage', data)
            })
          }

          console.log(res)
        }).catch(err=> {
          alert(err)
        })
     

    }


  }
}
