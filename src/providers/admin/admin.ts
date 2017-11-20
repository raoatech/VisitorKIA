import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Admin, profile } from '../../models/admin'

@Injectable()
export class AdminProvider {

  firedata = firebase.database().ref('/user')

  constructor(public afauth: AngularFireAuth) {
    console.log('Hello AdminProvider Provider');
  }

  createAdmin(admin: Admin){

      var promise = new Promise((resolve, reject) => {

        this.afauth.auth.createUserWithEmailAndPassword(admin.email,admin.password).then(() => {

          resolve({success: true})
          
        }).catch((err:Error)=> {
          reject(err)
        })
      })

    return promise
  }


  getAdminDetails(){

      var promise = new Promise((resolve, reject)=> {

        this.firedata.child(this.afauth.auth.currentUser.uid).once('value', (snap)=> {

          resolve(snap.val())

        }).catch((err:Error)=> {

          reject(err)
        })
      })

      return promise 
  }

  createProfile(credentials) {

    let date = new Date()
    
        let dd :any = date.getDate();
        let mm: any = date.getMonth() + 1;
        let yyyy = date.getFullYear();
    
        if(dd<10) {
          dd= '0'+dd
        }
    
        if(mm < 10) {
          mm = '0'+ mm
        }
    
        let today = mm + '/'+ dd + '/' + yyyy

    var promise = new Promise((resolve, reject)=> {

      this.firedata.child(this.afauth.auth.currentUser.uid).set({
        uid: this.afauth.auth.currentUser.uid,
        name: credentials.name,
        address: credentials.address,
        date : today,
        imageURL : credentials.image
  
      }).then((res)=> {
        resolve({success: true})
      }).catch((err: Error)=> {
        reject(err)
      })

    })

    return promise
    
  }

  updateProfile(credentials) {
    var promise = new Promise((resolve, reject)=> {

      this.firedata.child(this.afauth.auth.currentUser.uid).update({
        uid: this.afauth.auth.currentUser.uid,
        name: credentials.name,
        address: credentials.address,
        imageURL : credentials.image,
      }).then((res)=> {
        resolve(res)
      }).catch((err)=> {
        reject(err)
      })
    })

    return promise
  }

}
