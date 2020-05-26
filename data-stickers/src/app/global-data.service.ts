import { Injectable } from '@angular/core';
import { StickerInfo } from './sticker-info-class';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
	domain_info = {};
	image_dict = {};
	recent_use = [];
	stickerInfo: StickerInfo; 
		
  	constructor() {
		this.domain_info = {
			"steps": {
				"units": {
					"steps": {
						"maxAmount": 10000
					}, "miles": {
						"maxAmount": 100
					}, "km": {
						"maxAmount": 100
					}
				},
				"slider_image_url": "../../assets/icon/footprint.svg"
			}, 
			"heartbeat": {
				"units": {
					"bpm": {
						"maxAmount": 100
					}
				},
				"slider_image_url": "../../assets/icon/bxs-heart.svg"
			},
			"calories": {
				"units": {
					"calories": {
						"maxAmount": 10000
					}
				},
				"slider_image_url": "../../assets/icon/bxs-hot.svg"
			},
			"time": {
				"units": {
					"hour:minute": {
						"maxAmount": 1499
					},
					"days": {
						"maxAmount": 14
					}
				},
				"slider_image_url": "../../assets/icon/bxs-time-five.svg"
			},
			"music": {
				"units": {
					"minutes": {
						"maxAmount": 60
					},
					"hours": {
						"maxAmount": 24
					},
					"plays": {
						"maxAmount": 50
					}
				},
				"slider_image_url": "../../assets/icon/bxs-music.svg"
			}
		}

		this.image_dict = {
			"steps": {
				"../../../assets/stickers/steps/plain-domain-relevant-1.png": true,
				"../../../assets/stickers/steps/plain-domain-relevant-2.png": true,
				"../../../assets/stickers/steps/plain-domain-relevant-3.png": true,
				"../../../assets/stickers/steps/plain-domain-agnostic-1.png": false,
				"../../../assets/stickers/steps/plain-domain-agnostic-2.png": false,
				"../../../assets/stickers/steps/plain-domain-agnostic-3.png": false,
				"../../../assets/stickers/steps/track-11.png": false,
				"../../../assets/stickers/steps/rhino-28.png": false,
				"../../../assets/stickers/steps/embellished-09.png": true,
				"../../../assets/stickers/steps/2-12.png": false,
				"../../../assets/stickers/steps/embellished-13.png": true,
				"../../../assets/stickers/steps/giraffe-08.png": false
			},
			"heartbeat": {
				"../../../assets/stickers/heart rate/plain-domain-relevant-1.png": true,
				"../../../assets/stickers/heart rate/plain-domain-relevant-2.png": true,
				"../../../assets/stickers/heart rate/plain-domain-relevant-3.png": true,
				"../../../assets/stickers/heart rate/plain-domain-agnostic-2.png": false,
				"../../../assets/stickers/heart rate/plain-domain-agnostic-3.png": false,
				"../../../assets/stickers/heart rate/embellished-05.png": true,
				"../../../assets/stickers/heart rate/7-09.png": false,
				"../../../assets/stickers/heart rate/7-07.png": false,
				"../../../assets/stickers/heart rate/7-03.png": true,
				"../../../assets/stickers/heart rate/embellished-15.png": true,
				"../../../assets/stickers/heart rate/7-12.png": false,
				"../../../assets/stickers/heart rate/7-08.png": false,
			}, 
			"calories": {
				
				"../../../assets/stickers/calories/plain-domain-relevant-1.png": true,
				"../../../assets/stickers/calories/plain-domain-relevant-2.png": true,
				"../../../assets/stickers/calories/plain-domain-relevant-3.png": true,
				"../../../assets/stickers/calories/plain-domain-agnostic-1.png": false,
				"../../../assets/stickers/calories/plain-domain-agnostic-2.png": false,
				"../../../assets/stickers/calories/plain-domain-agnostic-3.png": false,
				"../../../assets/stickers/calories/embellished-14.png": true,
				"../../../assets/stickers/calories/8-12.png": false,
				"../../../assets/stickers/calories/embellished-11.png": true,
				"../../../assets/stickers/calories/4-06.png": false,
				"../../../assets/stickers/calories/4-07.png": false,
				"../../../assets/stickers/calories/embellished-01.png": true
			},
			"time": {
				"../../../assets/stickers/time/5-02.png": true,
				"../../../assets/stickers/time/5-01.png": true,
				"../../../assets/stickers/time/5-06.png": false,
				"../../../assets/stickers/time/5-03.png": true,
				"../../../assets/stickers/time/embellished-10.png": true,
				"../../../assets/stickers/time/plain-09.png": true,
				"../../../assets/stickers/time/5-09.png": false,
				"../../../assets/stickers/time/plain-02.png": true,
				"../../../assets/stickers/time/5-12.png": false,
				"../../../assets/stickers/time/embellished-03.png": true,
				"../../../assets/stickers/time/5-08.png": false,
				"../../../assets/stickers/time/plain-12.png": true,
				"../../../assets/stickers/time/5-07.png": true,
				"../../../assets/stickers/time/embellished-08.png": true
			},
			"music": {
				"../../../assets/stickers/music/6-09.png": false,
				"../../../assets/stickers/music/plain-06.png": false,
				"../../../assets/stickers/music/6-12.png": false,
				"../../../assets/stickers/music/6-02.png": true,
				"../../../assets/stickers/music/embellished-12.png": true,
				"../../../assets/stickers/music/embellished-07.png": true,
				"../../../assets/stickers/music/plain-13.png": false,
				"../../../assets/stickers/music/6-10.png": false,
				"../../../assets/stickers/music/plain-05.png": false,
				"../../../assets/stickers/music/6-01.png": true,
				"../../../assets/stickers/music/6-08.png": false,
				"../../../assets/stickers/music/embellished-04.png": true,
				"../../../assets/stickers/music/6-06.png": false,
				"../../../assets/stickers/music/6-03.png": true
			}
		}
			
		this.stickerInfo = new StickerInfo();
	}
}
