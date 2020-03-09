import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
		domain_info = {};

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
	}

		getDomainInfo() {
				return this.domain_info;
		}

}
