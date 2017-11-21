import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { firebaseConfig } from './config'
import { File } from '@ionic-native/file'
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ImageHandlerProvider } from '../providers/image-handler/image-handler';
import { AuthProvider } from '../providers/auth/auth';
import { VisitorProvider } from '../providers/visitor/visitor';
import { AdminProvider } from '../providers/admin/admin';
import { NetworkProvider } from '../providers/network/network';
import { Network } from '@ionic-native/network'

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImageHandlerProvider,
    AuthProvider,
    VisitorProvider,
    AdminProvider,
    File,
    FileChooser,
    FilePath,
    NetworkProvider,
    Network
  ]
})
export class AppModule {}
