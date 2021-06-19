import { Injectable } from '@angular/core';
import { StickerConfig } from './sticker-configs/sticker-config';
import { GenericPlainConfig } from './sticker-configs/generic/GenericPlainConfig';
import { GenericPlain3Config } from './sticker-configs/generic/GenericPlain3Config';
import { GenericChartjunkConfig } from './sticker-configs/generic/GenericChartjunkConfig';
import { GenericChartjunk3Config } from './sticker-configs/generic/GenericChartjunk3Config';
import { GenericAnalogyConfig } from './sticker-configs/generic/GenericAnalogyConfig';
import { GenericAnalogy2Config } from './sticker-configs/generic/GenericAnalogy2Config';
import { GenericAnalogy3Config } from './sticker-configs/generic/GenericAnalogy3Config';
import { SpecificHybridConfig } from './sticker-configs/specific/SpecificHybridConfig';
import { SpecificHybrid2Config } from './sticker-configs/specific/SpecificHybrid2Config';
import { CaloriesAnalogy1Config } from './sticker-configs/calories/CaloriesAnalogy1Config';
import { CaloriesAnalogy2Config } from './sticker-configs/calories/CaloriesAnalogy2Config';
import { CaloriesAnalogy3Config } from './sticker-configs/calories/CaloriesAnalogy3Config';
import { HeartbeatAnalogy1Config } from './sticker-configs/heartbeat/HeartbeatAnalogy1Config';
import { HeartbeatAnalogy2Config } from './sticker-configs/heartbeat/HeartbeatAnalogy2Config';
import { HeartbeatAnalogy3Config } from './sticker-configs/heartbeat/HeartbeatAnalogy3Config';
import { StepsAnalogy1Config } from './sticker-configs/steps/StepsAnalogy1Config';
import { StepsAnalogy2Config } from './sticker-configs/steps/StepsAnalogy2Config';
import { StepsAnalogy3Config } from './sticker-configs/steps/StepsAnalogy3Config';
import { TimeAnalogy1Config } from './sticker-configs/time/TimeAnalogy1Config';
import { TimeAnalogy2Config } from './sticker-configs/time/TimeAnalogy2Config';
import { TimeAnalogy3Config } from './sticker-configs/time/TimeAnalogy3Config';
import { MusicAnalogy1Config } from './sticker-configs/music/MusicAnalogy1Config';
import { MusicAnalogy2Config } from './sticker-configs/music/MusicAnalogy2Config';
import { MusicAnalogy3Config } from './sticker-configs/music/MusicAnalogy3Config';

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
				"units": ["calories", "g fiber", "g carbs", "g sodium", "g sugar"],
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
        		// "default_goal": 60
				"default_goal": null
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
				new SpecificHybrid2Config("assets/stickers/steps/plain-domain-relevant-1.png", "assets/stickers/steps/plain-1.svg", "assets/stickers/steps/chartjunk-1.svg"),
				new SpecificHybridConfig("assets/stickers/steps/plain-domain-relevant-2.png", "assets/stickers/steps/plain-2.svg", "assets/stickers/steps/chartjunk-2.svg"),
				new SpecificHybridConfig("assets/stickers/steps/plain-domain-relevant-3.png", "assets/stickers/steps/plain-3.svg", "assets/stickers/steps/chartjunk-3.svg"),
				new StepsAnalogy1Config("assets/stickers/steps/analogy-domain-relevant-1.png", "assets/stickers/steps/analogy-1.svg"),
				new StepsAnalogy2Config("assets/stickers/steps/analogy-domain-relevant-2.png", "assets/stickers/steps/analogy-2.svg"),
				new StepsAnalogy3Config("assets/stickers/steps/analogy-domain-relevant-3.png", "assets/stickers/steps/analogy-3.svg")
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
				new SpecificHybridConfig("assets/stickers/heartbeat/plain-domain-relevant-1.png", "assets/stickers/heartbeat/plain-1.svg", "assets/stickers/heartbeat/chartjunk-1.svg"),
				new SpecificHybrid2Config("assets/stickers/heartbeat/plain-domain-relevant-2.png", "assets/stickers/heartbeat/plain-2.svg", "assets/stickers/heartbeat/chartjunk-2.svg"),
				new SpecificHybridConfig("assets/stickers/heartbeat/plain-domain-relevant-3.png", "assets/stickers/heartbeat/plain-3.svg", "assets/stickers/heartbeat/chartjunk-3.svg"),
				new HeartbeatAnalogy1Config("assets/stickers/heartbeat/analogy-domain-relevant-1.png", "assets/stickers/heartbeat/analogy-1.svg"),
				new HeartbeatAnalogy2Config("assets/stickers/heartbeat/analogy-domain-relevant-2.png", "assets/stickers/heartbeat/analogy-2.svg"),
				new HeartbeatAnalogy3Config("assets/stickers/heartbeat/analogy-domain-relevant-3.png", "assets/stickers/heartbeat/analogy-3.svg"),
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
				new SpecificHybridConfig("assets/stickers/calories/plain-domain-relevant-1.png", "assets/stickers/calories/plain-1.svg", "assets/stickers/calories/chartjunk-1.svg"),
				new SpecificHybridConfig("assets/stickers/calories/plain-domain-relevant-2.png", "assets/stickers/calories/plain-2.svg", "assets/stickers/calories/chartjunk-2.svg"),
				new SpecificHybridConfig("assets/stickers/calories/plain-domain-relevant-3.png", "assets/stickers/calories/plain-3.svg", "assets/stickers/calories/chartjunk-3.svg"),
				new CaloriesAnalogy1Config("assets/stickers/calories/analogy-domain-relevant-1.png", "assets/stickers/calories/analogy-1.svg"),
				new CaloriesAnalogy2Config("assets/stickers/calories/analogy-domain-relevant-2.png", "assets/stickers/calories/analogy-2.svg"),
				new CaloriesAnalogy3Config("assets/stickers/calories/analogy-domain-relevant-3.png", "assets/stickers/calories/analogy-3.svg")
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
				new SpecificHybridConfig("assets/stickers/time/plain-domain-relevant-1.png", "assets/stickers/time/plain-1.svg", "assets/stickers/time/chartjunk-1.svg"),
				new SpecificHybridConfig("assets/stickers/time/plain-domain-relevant-2.png", "assets/stickers/time/plain-2.svg", "assets/stickers/time/chartjunk-2.svg"),
				new SpecificHybrid2Config("assets/stickers/time/plain-domain-relevant-3.png", "assets/stickers/time/plain-3.svg", "assets/stickers/time/chartjunk-3.svg"),
				new TimeAnalogy1Config("assets/stickers/time/analogy-domain-relevant-1.png", "assets/stickers/time/analogy-1.svg"),
				new TimeAnalogy2Config("assets/stickers/time/analogy-domain-relevant-2.png", "assets/stickers/time/analogy-2.svg"),
				new TimeAnalogy3Config("assets/stickers/time/analogy-domain-relevant-3.png", "assets/stickers/time/analogy-3.svg"),
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
				new SpecificHybridConfig("assets/stickers/music/plain-domain-relevant-1.png", "assets/stickers/music/plain-1.svg", "assets/stickers/music/chartjunk-1.svg"),
				new SpecificHybridConfig("assets/stickers/music/plain-domain-relevant-2.png", "assets/stickers/music/plain-2.svg", "assets/stickers/music/chartjunk-2.svg"),
				new SpecificHybrid2Config("assets/stickers/music/plain-domain-relevant-3.png", "assets/stickers/music/plain-3.svg", "assets/stickers/music/chartjunk-3.svg"),
				new MusicAnalogy1Config("assets/stickers/music/analogy-domain-relevant-1.png", "assets/stickers/music/analogy-1.svg"),
				new MusicAnalogy2Config("assets/stickers/music/analogy-domain-relevant-2.png", "assets/stickers/music/analogy-2.svg"),
				new MusicAnalogy3Config("assets/stickers/music/analogy-domain-relevant-3.png", "assets/stickers/music/analogy-3.svg"),
			]
		}
	}
}
