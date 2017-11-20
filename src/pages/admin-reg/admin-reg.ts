import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AdminProvider } from '../../providers/admin/admin'
import { Admin, profile } from '../../models/admin'


@IonicPage()
@Component({
  selector: 'page-admin-reg',
  templateUrl: 'admin-reg.html',
})
export class AdminRegPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, public load: LoadingController
            ,private admin : AdminProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminRegPage');
  }

  profile(email, pass, repass){

    let data : Admin =  {
      email: email,
      password: pass
    }

    let load = this.load.create({
      content: 'Loading'
    })



    load.present()

    if( email == null ||  pass == null || repass == null){

        load.dismiss();

        this.alert.create({
          message: 'Provide necessary details to create Account',
          buttons: ['ok']
        }).present()

    }else if(pass != repass){
      load.dismiss();
      this.alert.create({
        message: 'Password doesnt match',
        buttons: ['ok']
      }).present()

    }else{
      load.dismiss()

      this.admin.createAdmin(data).then((res)=> {
        
        this.navCtrl.setRoot('ProfilePicPage')

   }).catch((err)=>{
     load.dismiss()
     alert(err.message)
   })
}

}


}
