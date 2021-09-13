import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss'],
})
export class ShareButtonComponent implements OnInit {
  text = "Share to Social Media";
  url = "https://docs.snapchat.com/docs/tutorials/creative-kit/web"
  phone = "9497716451";
  img = "../../assets/stickers/foot.png";
  constructor(private socialSharing: SocialSharing , private file: File) { }

  ngOnInit() {}

  async sendLocalFile(){
    return this.file.copyFile(`${this.file.applicationDirectory}../../../assets/stickers`, 'foot.png', this.file.cacheDirectory, `${new Date().getTime()}.png}`)
  }

  removeTempFile(name){
    this.file.removeFile(this.file.cacheDirectory,name);
  }

  async shareFacebook() {

    //let file = await this.sendLocalFile();
    //console.log('File',file);

    this.socialSharing.shareViaFacebook(null, this.url).then( ()=>{

    }).catch(e => {
     // this.removeTempFile(file.name);
    })
  }
  async shareTwitter(){
    this.socialSharing.shareViaTwitter(this.text).then( ()=>{

    }).catch(e => {
      // this.removeTempFile(file.name);
     })
  }

  async shareSMS(){
    this.socialSharing.shareViaSMS(this.text, this.phone).then( ()=>{

    }).catch(e => {
      // this.removeTempFile(file.name);
     })
  }

  async shareIns(){
    this.socialSharing.shareViaInstagram(this.text,this.img).then( ()=>{

    }).catch(e => {
      // this.removeTempFile(file.name);
     })
  }


}
