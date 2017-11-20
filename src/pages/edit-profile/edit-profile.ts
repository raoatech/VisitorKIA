import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AdminProvider } from '../../providers/admin/admin'
import { ImageHandlerProvider } from '../../providers/image-handler/image-handler'


@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  data: any = {}
  imgSrc : any

  constructor(public navCtrl: NavController, public navParams: NavParams, public admin: AdminProvider, private image: ImageHandlerProvider, private load:LoadingController, private alert:AlertController) {
 
    this.admin.getAdminDetails().then(res=> {
      this.data = res

      this.imgSrc = this.data.imageURL
    }).catch((err:Error)=> {
      
      this.alert.create({
        title: 'Error',
        message: err.message
      }).present
      
    })
      
  }

  uploadImage() {

    let load = this.load.create({
      content: 'Loading'
    })

    load.present()
    
    this.image.uploadImage().then(res=> {
      load.dismiss()
      this.imgSrc = res
    }).catch((err:Error)=> {
      load.dismiss()
      alert(err.message)
    })

  }


  update(name, address) {

    let load = this.load.create({
      content: 'Loading'
    })

    load.present()

    let data = {
      name: name,
      address: address,
      image: this.imgSrc
    }

    this.admin.updateProfile(data).then(()=> {
      load.dismiss()
        this.alert.create({
          title: 'Success',
          message: 'Profile updated successfully',
          buttons: [{
            text: 'Ok',
            handler: ()=> {
              this.navCtrl.setRoot('TabsPage')
            }
          }]
        }).present()
  
    }).catch(err=> {
      load.dismiss()
        this.alert.create({
          title: 'Error',
          message: err.message,
          buttons: ['OK']
        }).present()
      })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

}
