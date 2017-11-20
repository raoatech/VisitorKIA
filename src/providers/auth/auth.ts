import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user'

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public afauth : AngularFireAuth ) {
    console.log('Hello AuthProvider Provider');
  }

  login(credentials: User) {

    var promise = new Promise((resolve, reject) => {
      this.afauth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(res=> {

          resolve({success: true})
      }).catch((err:Error)=> {

        reject(err)
      })
    })
    
    return promise
  }

}
