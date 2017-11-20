import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { VisitorProvider } from '../../providers/visitor/visitor'

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  data: any ={

      firstname: null,
      lastname: null,
      email: null,
      phone: null,
      address: null,
      gender: null,
      employeeName : null,
      employeePhone: null,
      reason: null,
      access: null
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,private loadCtrl:LoadingController, private visitor:VisitorProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  createVisitor() {

    let load = this.loadCtrl.create({
      content: 'Loading'
    })

    load.present()

    this.visitor.createVisitor(this.data).then(res=> {

      this.visitor.createVisitation(this.data).then(res=> {

        load.dismiss().then(()=> {
          
          this.alertCtrl.create({
            title: 'Success',
            message: 'Visitor created successfully',
            buttons: [{
              text: 'Ok',
              handler: ()=> {
                this.navCtrl.push('LoginPage')
              }
            }]
          }).present()

      })
     

      })
    }).catch((err)=> {

        load.dismiss().then(()=> {
          this.alertCtrl.create({
            title:'Error',
            message: err.message,
            buttons: ['Ok']
          }).present()
        })

    })

    console.log(this.data)
  }
}
