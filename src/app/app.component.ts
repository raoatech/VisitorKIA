import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth'

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage: any

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private afauth: AngularFireAuth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      splashScreen.hide();
    });
    
    this.checkAuthorization()
  }

  checkAuthorization() {
    
      this.afauth.auth.onAuthStateChanged((user)=> {
            if(user){
              this.rootPage = 'LoginPage'
            }else{
              this.rootPage = HomePage
            }
          })
         
      }
}

