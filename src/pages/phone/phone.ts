import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, AlertController  } from 'ionic-angular';
import { VisitorProvider } from '../../providers/visitor/visitor'

/**
 * Generated class for the PhonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phone',
  templateUrl: 'phone.html',
})
export class PhonePage {

visit : any

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadCtrl: LoadingController,
    private alertCtrl: AlertController, private visitor: VisitorProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhonePage');
  }

  check(phone) {
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
          console.log(res)

          this.visit = res[0].phone

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
              data : res[0]
            }

            load.dismiss().then((res)=> {
              this.navCtrl.setRoot('VisitationPage', data)
            })
          }

          console.log(res)
        }).catch(err=> {
          load.dismiss().then(()=> {
            this.alertCtrl.create({
              title: 'Error',
              message: 'Phone record not found',
              buttons: ['Ok']
            }).present()
          })
        })
     

    }

    
    // this.navCtrl.setRoot('DashboardPage')
  }

}
