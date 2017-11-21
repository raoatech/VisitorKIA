import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network'
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkProvider {

  constructor(public http: Http) {
    console.log('Hello NetworkProvider Provider');
  }

}
