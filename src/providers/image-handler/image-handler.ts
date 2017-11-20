import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path'
import firebase from 'firebase'


@Injectable()
export class ImageHandlerProvider {

  firestore = firebase.storage()
  nativePath : any

  constructor(private afauth: AngularFireAuth, public file: File, public fileChooser:FileChooser, public filepath: FilePath) {
    console.log('Hello ImageHandlerProvider Provider');
  }


  uploadImage() {

    var promise = new Promise((resolve, reject) => {

        this.fileChooser.open().then((url)=> {
          (<any>window).FilePath.resolveNativePath(url, (result)=> {
            this.nativePath = result;
            (<any>window).resolveLocalFileSystemURL(this.nativePath, (res)=> {
              res.file((resFile)=> {
                var reader = new FileReader();
                reader.readAsArrayBuffer(resFile);
                reader.onloadend = (evt:any) => {
                  let imgBlob = new Blob([evt.target.result], {type: 'image/jpeg'});
                  let imageStore = this.firestore.ref('/profileImages').child(this.afauth.auth.currentUser.uid);
                  imageStore.put(imgBlob).then((res)=> {
                    this.firestore.ref('/profileImages').child(this.afauth.auth.currentUser.uid).getDownloadURL().then((url)=> {
                      resolve(url)
                    }).catch((err)=> {
                      reject(url)
                    })
                  }).catch((err)=> {
                    reject(err)
                  })
                }
              })
            })
          })
        })
    })

    return promise
  }

}
