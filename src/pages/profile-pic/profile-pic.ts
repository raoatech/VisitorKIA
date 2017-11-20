import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ImageHandlerProvider } from '../../providers/image-handler/image-handler';
import { AdminProvider } from '../../providers/admin/admin'

/**
 * Generated class for the ProfilePicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-pic',
  templateUrl: 'profile-pic.html',
})
export class ProfilePicPage {

  imgSrc = "https://firebasestorage.googleapis.com/v0/b/visitorapp-e778b.appspot.com/o/profile.png?alt=media&token=cf16535c-adc0-4865-97cb-cd82d28737d8"

  constructor(public navCtrl: NavController, public navParams: NavParams, public load: LoadingController, public alert: AlertController, private image: ImageHandlerProvider, 
            private admin:AdminProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePicPage');
  }

  uploadImage() {

    let load = this.load.create({
      content: 'Loading'
    })

    load.present()
    this.image.uploadImage().then((res: any)=> {
      load.dismiss()
      this.imgSrc = res
    }).catch((err:Error)=> {
      load.dismiss()
      alert(err.message)
    })

  }

  profile(name, add) {

    let load = this.load.create({
      content: 'Loading'
    })

    let data = {
      name: name,
      address: add,
      image: this.imgSrc
    }

    load.present()

    if(name == null || add == null) {

      load.dismiss();
      this.alert.create({
        title: 'Oops',
        message: 'Provide necessary details',
        buttons: ['Ok']
      }).present()

    }else{

      load.dismiss().then(()=> {

      this.admin.createProfile(data).then((res)=> {

        this.alert.create({
          title: 'Success',
          message: 'Profile Created!',
          buttons: [{
            text: 'Ok',
            handler: ()=> {
              this.navCtrl.push('TabsPage')
            }
          }]
        }).present()

      }).catch(err=> {
        alert(err.message)
      })
    })

  }

  }


}
