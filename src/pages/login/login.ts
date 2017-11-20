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
      console.log(err)
    })

    this.image = this.navParams.get('data')
    console.log('ionViewDidLoad LoginPage');
  }

  register(){
    this.navCtrl.push('RegisterPage')
  }

  checkVisitor(phone) {
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

    
    // this.navCtrl.setRoot('DashboardPage')
  }

  admin(){
    this.navCtrl.setRoot(HomePage)
  }

  continue() {
    this.navCtrl.push('PhonePage')
  }
}
