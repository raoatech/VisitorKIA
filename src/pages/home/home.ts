import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public loadctrl: LoadingController, public alert: AlertController, private auth: AuthProvider) {

  }

  adminLogin(email, password) {

    let data = {
      email: email,
      password: password
    }

    const load = this.loadctrl.create({
      content: "Loading",
      duration: 3000
    })
    load.present();

    if(email == null || password == null) {
      load.dismiss()
      this.alert.create({
        title: 'Warning',
        message: 'Email/Password cant be left empty'
      }).present()
    }else{
   

        this.auth.login(data).then((res: any)=> {

          if(res.success) {

            load.dismiss()
              this.navCtrl.setRoot('TabsPage')
          }
        }).catch((err)=> {

          load.dismiss()
            this.alert.create({
              title: 'Error',
              message: err.message,
              buttons: ['OK']
            }).present()


        })


     
    }
  }

  signup() {

    this.navCtrl.push('AdminRegPage')

  }



}
