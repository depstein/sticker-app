import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { GlobalDataService } from './../global-data.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-recent-use',
  templateUrl: './recent-use.component.html',
  styleUrls: ['./recent-use.component.scss'],
})
export class RecentUseComponent implements OnInit {
  @Input() domain;
  
  constructor(public global: GlobalDataService, public router:Router,private storage: Storage) { }

  ngOnInit() {}
  goToCreateStickerPage(this_img) {
		this.router.navigate(['create-sticker', {img: this_img, domain: this.domain}]);
  }
  
  
}
