import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AdminProvider } from '../../providers/admin/admin';
import { AngularFireAuth } from 'angularfire2/auth'
import { VisitorProvider } from '../../providers/visitor/visitor';


@IonicPage()
@Component({
  selector: 'page-admin-dash',
  templateUrl: 'admin-dash.html',
})
export class AdminDashPage {

  admin: any = 'dashboard'
  isAndroid : boolean = false

  openSearchbar = false

  myVisitor : any = []

  data: any = {}
  email = this.afauth.auth.currentUser.email
  imgSrc = "assets/img/profile.png"

  constructor(public navCtrl: NavController, public navParams: NavParams,private afauth: AngularFireAuth, public plat: Platform, public adminPrv: AdminProvider, private visitor: VisitorProvider) {
  
    this.isAndroid = plat.is('android')

    this.adminPrv.getAdminDetails().then(res=> {
      this.data = res
    }).catch(err=> {
      console.log(err)
    })

    this.getVisit()
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminDashPage');

    // this.visitor.getVisitor().then((res)=> {
    //   this.myVisitor = res
    // })

    this.visitor.getVisitation().then((res:any)=> {
      this.myVisitor = res.reverse()
      console.log(this.myVisitor)
      // this.myVisitor.reverse()
      
    }).catch(err=> {
      console.log(err)
    })
    
   
  }

  getVisit() {
    this.visitor.getVisitation().then((res:any)=> {
      this.myVisitor = res.reverse()
      console.log(this.myVisitor)
      // this.myVisitor.reverse()
      
    }).catch(err=> {
      console.log(err)
    })
  }

  visitorDetails(item) {

    let data = {
      data: item
    }

    this.navCtrl.push('VisitorDetailsPage', data)
  }

  getVisitor(i) {
    let data = {
      data : i
    }

    this.navCtrl.push('VisitorDetailsPage', data)
  }
  

  openSearch() {
    this.openSearchbar = true
  }

  closeSearch() {
    this.openSearchbar = false
  }

  getItems(ev: any){

    // this.getVisit()
    
    
        let val =ev.target.value
    
    
        this.visitor.getVisitation().then((res: any)=>{
    
          this.myVisitor = res.reverse()
    
          if(val && val.trim() != '') {
            this.myVisitor = this.myVisitor.filter((item) => {
              return (item.firstname.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
          }
        })
        
    
    
      }

}
