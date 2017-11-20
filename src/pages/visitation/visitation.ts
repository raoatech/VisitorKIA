import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,App, AlertController } from 'ionic-angular';
import { VisitorProvider } from '../../providers/visitor/visitor'

/**
 * Generated class for the VisitationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visitation',
  templateUrl: 'visitation.html',
})
export class VisitationPage {

  visitation : any = {}


  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,private loadCtrl:LoadingController, private visitor:VisitorProvider, private app: App) {

      this.visitation = this.navParams.get('data')
      console.log(this.navParams.get('data'))

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitationPage');
  }

  visit(name, phone, access, reason) {

    let load = this.loadCtrl.create({
      content: 'Loading'
    })

    load.present()

    let data= {
      employeeName : name,
      employeePhone: phone,
      access: access,
      reason: reason,
      address: this.visitation.address,
      firstname: this.visitation.firstname,
      lastname: this.visitation.lastname,
      email: this.visitation.email,
      phone: this.visitation.phone,
      gender: this.visitation.gender
    }
    this.visitor.createVisitation(data).then((res)=> {
      load.dismiss().then(res=> {

          this.alertCtrl.create({
            title: 'Success',
            message: 'Welcome '+ this.visitation.firstname,
            buttons: [{
              text: 'Ok',
              handler: ()=> {

              this.navCtrl.push('LoginPage')

              }
            }]
          }).present()
      })
     
    }).catch((err: Error)=> {

        load.dismiss().then(res=> {
          this.alertCtrl.create({
            title: 'Error',
            message: err.message,
            buttons : ['Ok']
          }).present()
        })

    })
  }

}
