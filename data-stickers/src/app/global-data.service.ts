import { Injectable } from '@angular/core';
import { StickerConfig } from './sticker-configs/sticker-config';
import { GenericPlainConfig } from './sticker-configs/generic/GenericPlainConfig';
import { GenericPlain3Config } from './sticker-configs/generic/GenericPlain3Config';
import { GenericChartjunkConfig } from './sticker-configs/generic/GenericChartjunkConfig';
import { GenericChartjunk3Config } from './sticker-configs/generic/GenericChartjunk3Config';
import { GenericAnalogyConfig } from './sticker-configs/generic/GenericAnalogyConfig';
import { GenericAnalogy2Config } from './sticker-configs/generic/GenericAnalogy2Config';
import { GenericAnalogy3Config } from './sticker-configs/generic/GenericAnalogy3Config';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

	domain_info = {};
	sticker_dict = {};
	recent_use = [];
	music_history =[];
	asked:boolean;
	stickerInfo:StickerConfig = undefined;

  	constructor() {
		this.asked = false;

		this.domain_info = {
			"steps": {
				"units": ["steps", "miles", "km"],
        		"color": "#35a8a1",
        		"default_goal": 10000
			},
			"heartbeat": {
				"units": ["bpm"],
        		"color": "#f27c4c",
        		"default_goal": 180
			},
			"calories": {
				"units": ["calories", "kilojoules"],
        		"color": "#7d7aa2",
        		"default_goal": 2500
			},
			"time": {
				"units": ["hour:minute", "seconds","days"],
        		"color": "#d85372",
        		"default_goal": 1000*60*60//One hour
			},
			"music": {
				"units": ["minutes", "hours", "plays"],
        		"color": "#5a819e",
        		"default_goal": 60
			}
		}

		this.sticker_dict = {
			"steps": [
				new GenericPlainConfig("assets/stickers/steps/plain-domain-agnostic-1.png", "assets/stickers/generic/plain-1.svg"),
				new GenericPlainConfig("assets/stickers/steps/plain-domain-agnostic-2.png", "assets/stickers/generic/plain-2.svg"),
				new GenericPlain3Config("assets/stickers/steps/plain-domain-agnostic-3.png", "assets/stickers/generic/plain-3.svg"),
				new GenericChartjunkConfig("assets/stickers/steps/chartjunk-domain-agnostic-1.png", "assets/stickers/generic/chartjunk-1.svg"),
				new GenericChartjunkConfig("assets/stickers/steps/chartjunk-domain-agnostic-2.png", "assets/stickers/generic/chartjunk-2.svg"),
				new GenericChartjunk3Config("assets/stickers/steps/chartjunk-domain-agnostic-3.png", "assets/stickers/generic/chartjunk-3.svg"),
				new GenericAnalogyConfig("assets/stickers/steps/analogy-domain-agnostic-1.png", "assets/stickers/generic/analogy-1.svg"),
				new GenericAnalogy2Config("assets/stickers/steps/analogy-domain-agnostic-2.png", "assets/stickers/generic/analogy-2.svg"),
				new GenericAnalogy3Config("assets/stickers/steps/analogy-domain-agnostic-3.png", "assets/stickers/generic/analogy-3.svg"),
				// {"sticker":"../../../assets/stickers/steps/plain-domain-relevant-1.png", "stickerType":"plain","relevance":"domain-relevant" },
				// {"sticker":"../../../assets/stickers/steps/plain-domain-relevant-2.png", "stickerType":"plain","relevance":"domain-relevant" },
				// {"sticker":"../../../assets/stickers/steps/plain-domain-relevant-3.png", "stickerType":"plain","relevance":"domain-relevant" },
				// {"sticker":"../../../assets/stickers/steps/plain-domain-agnostic-1.png", "stickerType":"plain","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/steps/plain-domain-agnostic-2.png", "stickerType":"plain","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/steps/plain-domain-agnostic-3.png", "stickerType":"plain","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/steps/track-11.png", "stickerType":"analogy","relevance":"domain-relevant" },
				// {"sticker":"../../../assets/stickers/steps/rhino-28.png", "stickerType":"analogy","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/steps/embellished-09.png", "stickerType":"chartjunk","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/steps/embellished-13.png", "stickerType":"chartjunk","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/steps/giraffe-08.png", "stickerType":"analogy","relevance":"domain-agnostic" }
			],
			"heartbeat": [
				new GenericPlainConfig("assets/stickers/heartbeat/plain-domain-agnostic-1.png", "assets/stickers/generic/plain-1.svg"),
				new GenericPlainConfig("assets/stickers/heartbeat/plain-domain-agnostic-2.png", "assets/stickers/generic/plain-2.svg"),
				new GenericPlain3Config("assets/stickers/heartbeat/plain-domain-agnostic-3.png", "assets/stickers/generic/plain-3.svg"),
				new GenericChartjunkConfig("assets/stickers/heartbeat/chartjunk-domain-agnostic-1.png", "assets/stickers/generic/chartjunk-1.svg"),
				new GenericChartjunkConfig("assets/stickers/heartbeat/chartjunk-domain-agnostic-2.png", "assets/stickers/generic/chartjunk-2.svg"),
				new GenericChartjunk3Config("assets/stickers/heartbeat/chartjunk-domain-agnostic-3.png", "assets/stickers/generic/chartjunk-3.svg"),
				new GenericAnalogyConfig("assets/stickers/heartbeat/analogy-domain-agnostic-1.png", "assets/stickers/generic/analogy-1.svg"),
				new GenericAnalogy2Config("assets/stickers/heartbeat/analogy-domain-agnostic-2.png", "assets/stickers/generic/analogy-2.svg"),
				new GenericAnalogy3Config("assets/stickers/heartbeat/analogy-domain-agnostic-3.png", "assets/stickers/generic/analogy-3.svg"),
				// {"sticker": "../../../assets/stickers/heartbeat/plain-domain-relevant-1.png", "stickerType":"plain","relevance":"domain-relevant" },
				// {"sticker":"../../../assets/stickers/heartbeat/plain-domain-relevant-2.png", "stickerType":"plain","relevance":"domain-relevant" },
				// {"sticker": "../../../assets/stickers/heartbeat/plain-domain-relevant-3.png", "stickerType":"plain","relevance":"domain-relevant" },
				// {"sticker":"../../../assets/stickers/heartbeat/plain-domain-agnostic-2.png", "stickerType":"plain","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/heartbeat/plain-domain-agnostic-3.png", "stickerType":"plain","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/heartbeat/embellished-05.png", "stickerType":"chartjunk","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/heartbeat/7-09.png", "stickerType":"analogy","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/heartbeat/7-07.png", "stickerType":"analogy","relevance":"domain-relevant" },
				// {"sticker":"../../../assets/stickers/heartbeat/7-03.png", "stickerType":"plain","relevance":"domain-relevant" },
				// {"sticker":"../../../assets/stickers/heartbeat/embellished-15.png", "stickerType":"chartjunk","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/heartbeat/7-12.png", "stickerType":"analogy","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/heartbeat/7-08.png", "stickerType":"analogy","relevance":"domain-relevant" }
			],
			"calories":
			[
				new GenericPlainConfig("assets/stickers/calories/plain-domain-agnostic-1.png", "assets/stickers/generic/plain-1.svg"),
				new GenericPlainConfig("assets/stickers/calories/plain-domain-agnostic-2.png", "assets/stickers/generic/plain-2.svg"),
				new GenericPlain3Config("assets/stickers/calories/plain-domain-agnostic-3.png", "assets/stickers/generic/plain-3.svg"),
				new GenericChartjunkConfig("assets/stickers/calories/chartjunk-domain-agnostic-1.png", "assets/stickers/generic/chartjunk-1.svg"),
				new GenericChartjunkConfig("assets/stickers/calories/chartjunk-domain-agnostic-2.png", "assets/stickers/generic/chartjunk-2.svg"),
				new GenericChartjunk3Config("assets/stickers/calories/chartjunk-domain-agnostic-3.png", "assets/stickers/generic/chartjunk-3.svg"),
				new GenericAnalogyConfig("assets/stickers/calories/analogy-domain-agnostic-1.png", "assets/stickers/generic/analogy-1.svg"),
				new GenericAnalogy2Config("assets/stickers/calories/analogy-domain-agnostic-2.png", "assets/stickers/generic/analogy-2.svg"),
				new GenericAnalogy3Config("assets/stickers/calories/analogy-domain-agnostic-3.png", "assets/stickers/generic/analogy-3.svg"),
				// {"sticker":"../../../assets/stickers/calories/plain-domain-relevant-1.png", "stickerType":"plain","relevance":"domain-relevant" },
				// {"sticker":"../../../assets/stickers/calories/plain-domain-relevant-2.png", "stickerType":"plain","relevance":"domain-relevant" },
				// {"sticker":"../../../assets/stickers/calories/plain-domain-relevant-3.png", "stickerType":"plain","relevance":"domain-relevant" },
				// {"sticker":"../../../assets/stickers/calories/plain-domain-agnostic-1.png", "stickerType":"plain","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/calories/plain-domain-agnostic-2.png", "stickerType":"plain","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/calories/plain-domain-agnostic-3.png", "stickerType":"plain","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/calories/embellished-14.png", "stickerType":"analogy","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/calories/8-12.png", "stickerType":"analogy","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/calories/embellished-11.png", "stickerType":"chartjunk","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/calories/4-06.png", "stickerType":"analogy","relevance":"domain-relevant" },
				// {"sticker":"../../../assets/stickers/calories/4-07.png", "stickerType":"analogy","relevance":"domain-relevant" },
				// {"sticker":"../../../assets/stickers/calories/embellished-01.png", "stickerType":"chartjunk","relevance":"domain-agnostic" }
			],
			"time":
			[
				new GenericPlainConfig("assets/stickers/time/plain-domain-agnostic-1.png", "assets/stickers/generic/plain-1.svg"),
				new GenericPlainConfig("assets/stickers/time/plain-domain-agnostic-2.png", "assets/stickers/generic/plain-2.svg"),
				new GenericPlain3Config("assets/stickers/time/plain-domain-agnostic-3.png", "assets/stickers/generic/plain-3.svg"),
				new GenericChartjunkConfig("assets/stickers/time/chartjunk-domain-agnostic-1.png", "assets/stickers/generic/chartjunk-1.svg"),
				new GenericChartjunkConfig("assets/stickers/time/chartjunk-domain-agnostic-2.png", "assets/stickers/generic/chartjunk-2.svg"),
				new GenericChartjunk3Config("assets/stickers/time/chartjunk-domain-agnostic-3.png", "assets/stickers/generic/chartjunk-3.svg"),
				new GenericAnalogyConfig("assets/stickers/time/analogy-domain-agnostic-1.png", "assets/stickers/generic/analogy-1.svg"),
				new GenericAnalogy2Config("assets/stickers/time/analogy-domain-agnostic-2.png", "assets/stickers/generic/analogy-2.svg"),
				new GenericAnalogy3Config("assets/stickers/time/analogy-domain-agnostic-3.png", "assets/stickers/generic/analogy-3.svg"),
				// {"sticker":"../../../assets/stickers/time/5-02.png", "stickerType":"plain","relevance":"domain-relevant" },
				// {"sticker":"../../../assets/stickers/time/5-01.png", "stickerType":"plain","relevance":"domain-relevant" },
				// {"sticker":"../../../assets/stickers/time/5-06.png", "stickerType":"plain","relevance":"domain-relevant" },
				// {"sticker":"../../../assets/stickers/time/5-03.png", "stickerType":"plain","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/time/embellished-10.png", "stickerType":"chartjunk","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/time/plain-09.png", "stickerType":"plain","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/time/5-09.png", "stickerType":"analogy","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/time/plain-02.png", "stickerType":"plain","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/time/5-12.png", "stickerType":"analogy","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/time/embellished-03.png", "stickerType":"chartjunk","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/time/5-08.png", "stickerType":"analogy","relevance":"domain-relevant" },
				// {"sticker": "../../../assets/stickers/time/embellished-08.png", "stickerType":"chartjunk","relevance":"domain-agnostic" }
			],
			"music":
			[
				new GenericPlainConfig("assets/stickers/music/plain-domain-agnostic-1.png", "assets/stickers/generic/plain-1.svg"),
				new GenericPlainConfig("assets/stickers/music/plain-domain-agnostic-2.png", "assets/stickers/generic/plain-2.svg"),
				new GenericPlain3Config("assets/stickers/music/plain-domain-agnostic-3.png", "assets/stickers/generic/plain-3.svg"),
				new GenericChartjunkConfig("assets/stickers/music/chartjunk-domain-agnostic-1.png", "assets/stickers/generic/chartjunk-1.svg"),
				new GenericChartjunkConfig("assets/stickers/music/chartjunk-domain-agnostic-2.png", "assets/stickers/generic/chartjunk-2.svg"),
				new GenericChartjunk3Config("assets/stickers/music/chartjunk-domain-agnostic-3.png", "assets/stickers/generic/chartjunk-3.svg"),
				new GenericAnalogyConfig("assets/stickers/music/analogy-domain-agnostic-1.png", "assets/stickers/generic/analogy-1.svg"),
				new GenericAnalogy2Config("assets/stickers/music/analogy-domain-agnostic-2.png", "assets/stickers/generic/analogy-2.svg"),
				new GenericAnalogy3Config("assets/stickers/music/analogy-domain-agnostic-3.png", "assets/stickers/generic/analogy-3.svg"),
				// {"sticker":"../../../assets/stickers/music/6-09.png", "stickerType":"analogy","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/music/plain-06.png", "stickerType":"plain","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/music/6-12.png", "stickerType":"analogy","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/music/6-02.png", "stickerType":"plain","relevance":"domain-relevant" },
				// {"sticker":"../../../assets/stickers/music/embellished-12.png", "stickerType":"chartjunk","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/music/embellished-07.png", "stickerType":"chartjunk","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/music/plain-13.png", "stickerType":"plain","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/music/6-10.png", "stickerType":"analogy","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/music/plain-05.png", "stickerType":"plain","relevance":"domain-agnostic" },
				// {"sticker":"../../../assets/stickers/music/6-01.png", "stickerType":"plain","relevance":"domain-relevant" },
				// {"sticker":"../../../assets/stickers/music/6-08.png", "stickerType":"analogy","relevance":"domain-relevant" },
				// {"sticker":"../../../assets/stickers/music/embellished-04.png", "stickerType":"chartjunk","relevance":"domain-agnostic" },
				// {"sticker": "../../../assets/stickers/music/6-06.png", "stickerType":"analogy","relevance":"domain-relevant" },
				// {"sticker":"../../../assets/stickers/music/6-03.png", "stickerType":"plain","relevance":"domain-relevant" }
			]
		}
	}
}
