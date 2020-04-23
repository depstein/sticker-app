import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { GlobalDataService } from './../global-data.service';

@Component({
  selector: 'app-recent-use',
  templateUrl: './recent-use.component.html',
  styleUrls: ['./recent-use.component.scss'],
})
export class RecentUseComponent implements OnInit {
  @Input() domain;
  
  constructor(public global: GlobalDataService, public router:Router) { }

  ngOnInit() {}
  goToCreateStickerPage(this_img) {
		this.router.navigate(['create-sticker', {img: this_img, domain: this.domain}]);
  }
  
  
}
