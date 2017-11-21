import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import firebase from 'firebase'
import { Visitor } from '../../models/visitor'

@Injectable()
export class VisitorProvider {

  firedata = firebase.database().ref('/visitor')

  firevisit = firebase.database().ref('/visitation')
  constructor(private afauth: AngularFireAuth) {
    console.log('Hello VisitorProvider Provider');
  }

  createVisitor(credentials){

    let date = new Date();

    let dd :any = date.getDate();
    let mm : any = date.getMonth() +1;
    let yyyy = date.getFullYear();
    let hr :any = date.getHours()
    let min: any = date.getMinutes();
    let seconds: any= date.getSeconds();

    if(dd < 10){
      dd = '0'+dd
    }

    if(mm < 10) {
      mm = '0'+mm
    }

    if(hr < 10) {
      hr = '0'+hr
    }

    if(min < 10) {
      min = '0'+mm
    }

    if(seconds < 10){
      seconds = '0'+seconds
    }

    let now = dd+'/'+mm+'/'+yyyy
    let time = hr+':'+min+':'+seconds

    var promise = new Promise((resolve, reject)=> {

      this.firedata.child(this.afauth.auth.currentUser.uid).push({
        uid: this.afauth.auth.currentUser.uid,
        firstname: credentials.firstname,
        lastname: credentials.lastname,
        email: credentials.email,
        phone: credentials.phone,
        gender: credentials.gender,
        address: credentials.address,
        date: now,
        time: time
        
      }).then((res)=> {
        resolve({success: true})
      }, (err)=> {
        reject(err)
      })

    })

    return promise
  }

  getVisitor(){

    var promise =  new Promise((resolve, reject)=> {


        firebase.database().ref('/visitor/').child(this.afauth.auth.currentUser.uid).once('value', (snap)=> {
          let data = snap.val();

          let dataArr = [] 

          for(var i in data){
            dataArr.push(data[i])
          }
            resolve(dataArr)
    }).catch((err: Error)=> {
      reject(err)
    })


  })

  return promise
}

  visitIn(phone) {

      var promise = new Promise((resolve, reject)=> {

        this.firedata.child(this.afauth.auth.currentUser.uid).orderByChild('phone').equalTo(phone).once('value', snap=> {
          
          let data = snap.val()

          let visitArr = []

          for( var key in data) {
            visitArr.push(data[key])
          }

          resolve(visitArr)
        }).catch(err=> {
          reject(err)
        })
      })

      return promise
  }

  createVisitation(details){

    let date = new Date();
    
        let dd :any = date.getDate();
        let mm : any = date.getMonth() + 1;
        let yyyy = date.getFullYear();
        let hr :any = date.getHours()
        let min: any = date.getMinutes();
        let seconds: any= date.getSeconds();
    
        if(dd < 10){
          dd = '0'+dd
        }
    
        if(mm < 10) {
          mm = '0'+mm
        }
    
        if(hr < 10) {
          hr = '0'+hr
        }
    
        if(min < 10) {
          min = '0'+mm
        }
    
        if(seconds < 10){
          seconds = '0'+seconds
        }
    
        let now = dd+'/'+mm+'/'+yyyy
        let time = hr+':'+min+':'+seconds

    var promise = new Promise((resolve, reject) => {

      this.firevisit.child(this.afauth.auth.currentUser.uid).push({
        firstname: details.firstname,
        lastname: details.lastname,
        email: details.email,
        gender: details.gender,
        phone: details.phone,
        employeeName: details.employeeName,
        employeePhone: details.employeePhone,
        date: now,
        reason: details.reason,
        accCode: details.access,
        time: time,
        address: details.address

      }).then((res)=> {
        resolve({success: true})
      }, (err)=> {
        reject(err)
      })

    })

    return promise

  }

  getVisitation(){
    
    var promise = new Promise((resolve, reject)=> {

      this.firevisit.child(this.afauth.auth.currentUser.uid).once('value', snap=> {
        
        let data = snap.val()

        let visitArr = []

        for(var key in data){
          visitArr.push(data[key])
        }

        resolve(visitArr)
      }).catch(err=> {
        reject(err)
      })
    })

    return promise
  }

  signOut(phone){

    let date = new Date();
    
        let dd :any = date.getDate();
        let mm : any = date.getMonth() + 1;
        let yyyy = date.getFullYear();
        let hr :any = date.getHours()
        let min: any = date.getMinutes();
        let seconds: any= date.getSeconds();
    
        if(dd < 10){
          dd = '0'+dd
        }
    
        if(mm < 10) {
          mm = '0'+mm
        }
    
        if(hr < 10) {
          hr = '0'+hr
        }
    
        if(min < 10) {
          min = '0'+mm
        }
    
        if(seconds < 10){
          seconds = '0'+seconds
        }
    
        let now = dd+'/'+mm+'/'+yyyy
        let time = hr+':'+min+':'+seconds
    var promise = new Promise((resolve, reject)=> {

      this.firevisit.child(this.afauth.auth.currentUser.uid).orderByChild('phone').equalTo(phone).limitToLast(1).once('child_added', snapshot=> {
        snapshot.ref.update({dateout: now,
        timeout: time}).then(res=> {
          resolve({success: true})
        }).catch(err=> {
          reject(err)
        })
      })

    })

    return promise
  }

}
