import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
		domain_info = {};
		image_dict = {};
		recent_use = [];
  constructor() {
			this.domain_info = {
					"steps": {
							"units": {
									"steps": {
											"maxAmount": 10000
									},
									"miles": {
											"maxAmount": 100
									},
									"km": {
											"maxAmount": 100
									}
							},
							"slider_image_url": "../../assets/icon/footprint.svg"
					},
					"heartrate": {
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
									"hours": {
											"maxAmount": 24
									},
									"minutes": {
											"maxAmount": 60
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
					"steps": [
							[
									"../../../assets/stickers/steps/2-02.png",
									"../../../assets/stickers/steps/plain-01.png",
									"../../../assets/stickers/steps/track-11.png"
							],
							[
									"../../../assets/stickers/steps/plain-18.png",
									"../../../assets/stickers/steps/rhino-28.png",
									"../../../assets/stickers/steps/embellished-09.png"
							],
							[
									"../../../assets/stickers/steps/2-12.png",
									"../../../assets/stickers/steps/2-14.png",
									"../../../assets/stickers/steps/plain-07.png"
							],
							[
									"../../../assets/stickers/steps/foot.png",
									"../../../assets/stickers/steps/embellished-13.png",
									"../../../assets/stickers/steps/giraffe-08.png"
							],
							[
									"../../../assets/stickers/steps/2-02.png",
									"../../../assets/stickers/steps/plain-01.png",
									"../../../assets/stickers/steps/track-11.png"
							],
							[
									"../../../assets/stickers/steps/plain-18.png",
									"../../../assets/stickers/steps/rhino-28.png",
									"../../../assets/stickers/steps/embellished-09.png"
							]
					],
					"heartrate": [
							[
									"../../../assets/stickers/heart rate/embellished-05.png",
									"../../../assets/stickers/heart rate/7-09.png",
									"../../../assets/stickers/heart rate/7-07.png"
							],
							[
									"../../../assets/stickers/heart rate/7-04.png",
									"../../../assets/stickers/heart rate/plain-04.png",
									"../../../assets/stickers/heart rate/7-03.png"
							],
							[
									"../../../assets/stickers/heart rate/7-07.png",
									"../../../assets/stickers/heart rate/embellished-15.png",
									"../../../assets/stickers/heart rate/7-12.png"
							],
							[
									"../../../assets/stickers/heart rate/plain-15.png",
									"../../../assets/stickers/heart rate/7-08.png",
									"../../../assets/stickers/heart rate/bpm.png"
							],
							[
									"../../../assets/stickers/heart rate/05.png",
									"../../../assets/stickers/heart rate/7-09.png",
									"../../../assets/stickers/heart rate/7-07.png"
							],
							[
									"../../../assets/stickers/heart rate/7-04.png",
									"../../../assets/stickers/heart rate/plain-04.png",
									"../../../assets/stickers/heart rate/7-03.png"
							]
					], 
					"calories": [
							[
									"../../../assets/stickers/calories/4-06.png",
									"../../../assets/stickers/calories/8-03.png",
									"../../../assets/stickers/calories/plain-14.png"
							],
							[
									"../../../assets/stickers/calories/plain-03.png",
									"../../../assets/stickers/calories/embellished-14.png",
									"../../../assets/stickers/calories/8-12.png"
							],
							[
									"../../../assets/stickers/calories/8-01.png",
									"../../../assets/stickers/calories/8-06.png",
									"../../../assets/stickers/calories/embellished-11.png"
							],
							[
									"../../../assets/stickers/calories/plain-10.png",
									"../../../assets/stickers/calories/4-07.png",
									"../../../assets/stickers/calories/embellished-01.png"
							],
							[
									"../../../assets/stickers/calories/4-06.png",
									"../../../assets/stickers/calories/8-03.png",
									"../../../assets/stickers/calories/plain-14.png"
							],
							[
									"../../../assets/stickers/calories/plain-03.png",
									"../../../assets/stickers/calories/embellished-14.png",
									"../../../assets/stickers/calories/8-12.png"
							]
					],
					"time": [
							[
									"../../../assets/stickers/time/5-02.png",
									"../../../assets/stickers/time/5-01.png",
									"../../../assets/stickers/time/5-06.png"
							],
							[
									"../../../assets/stickers/time/5-03.png",
									"../../../assets/stickers/time/embellished-10.png",
									"../../../assets/stickers/time/plain-09.png"
							],
							[
									"../../../assets/stickers/time/5-09.png",
									"../../../assets/stickers/time/plain-02.png",
									"../../../assets/stickers/time/5-12.png"
							],
							[
									"../../../assets/stickers/time/embellished-03.png",
									"../../../assets/stickers/time/5-08.png",
									"../../../assets/stickers/time/plain-12.png"
							],
							[
									"../../../assets/stickers/time/5-07.png",
									"../../../assets/stickers/time/plain-09.png",
									"../../../assets/stickers/time/embellished-08.png"
							],
							[
									"../../../assets/stickers/time/5-02.png",
									"../../../assets/stickers/time/5-01.png",
									"../../../assets/stickers/time/5-06.png"
							]
					],
					"music": [
							[
									"../../../assets/stickers/music/6-09.png",
									"../../../assets/stickers/music/plain-06.png",
									"../../../assets/stickers/music/6-12.png"
							],
							[
									"../../../assets/stickers/music/6-02.png",
									"../../../assets/stickers/music/embellished-12.png",
									"../../../assets/stickers/music/embellished-07.png"
							],
							[
									"../../../assets/stickers/music/plain-13.png",
									"../../../assets/stickers/music/6-10.png",
									"../../../assets/stickers/music/plain-05.png"
							],
							[
									"../../../assets/stickers/music/6-01.png",
									"../../../assets/stickers/music/6-08.png",
									"../../../assets/stickers/music/embellished-04.png"
							],
							[
									"../../../assets/stickers/music/6-01.png",
									"../../../assets/stickers/music/6-08.png",
									"../../../assets/stickers/music/embellished-04.png"
							],
							[
									"../../../assets/stickers/music/6-06.png",
									"../../../assets/stickers/music/6-03.png",
									"../../../assets/stickers/music/plain-05.png"
							]
					]
			}

	}
}
