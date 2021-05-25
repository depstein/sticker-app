import { AlertController } from "@ionic/angular";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { GlobalDataService } from "./../global-data.service";
import { Storage } from "@ionic/storage";
import { SpotifyService } from "../spotify.service";
import { ModalController } from "@ionic/angular";
import { ModalPage } from "../modals/modal/modal.page";
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';

import { SelectDataModalPage } from '../select-data-modal/select-data-modal.page';

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
})
export class InputComponent implements OnInit {
  @Output() changeInput:EventEmitter<any> = new EventEmitter();
  unit_list: any[] = [];
  unit_copy: any[] = []; // Used for slider's *ngIf to check for custom unit
  selected_unit: string;
  custom: string;
  canAddGoal: boolean;
  saved_unit: string;
  nutrient_data: any;
  music_unit: string;
  music_category: string;
  songName: Object;
  artists: Object;
  albums: Object;
  lastHour: any[] = [];
  lastDay: any[] = [];
  lastWeek: any[] = [];
  lastMonth: any[] = [];

  constructor(
    public alertController: AlertController,
    public global: GlobalDataService,
    private storage: Storage,
    private spotifyService: SpotifyService,
    public modalController: ModalController
  ) {
    this.custom = "custom";
  }

  ngOnInit() {
    this.unit_list = this.unit_copy = this.global.domain_info[this.global.stickerInfo.domain].units;
    if (this.global.stickerInfo.stickerType == "chartjunk" || this.global.stickerInfo.canAddGoal) {
      //Add the ability to add a goal if allowed for the domains
      this.canAddGoal = true;
      this.global.stickerInfo.goal = this.global.domain_info[this.global.stickerInfo.domain].default_goal;
      if(this.global.stickerInfo.domain == "time") {
        //for time, hour and minute are displayed instead of the goal field, so update appropriately
        this.global.stickerInfo.goal_hour = Math.floor(this.global.stickerInfo.goal/(60*60*1000));
        this.global.stickerInfo.goal_min = Math.floor(this.global.stickerInfo.goal/(60*1000)%60);
      }
      if(this.global.stickerInfo.stickerType == "chartjunk") {
        this.global.stickerInfo.hasGoal = true;
      }
    } else {
      this.canAddGoal = false;
    }

    if (this.global.stickerInfo.domain == 'music') {
      this.music_unit = "minutes";
      this.music_category = "music";
      this.updateMusicInputValue();
    }

    this.selected_unit = this.unit_list[0].trim();
    this.nutrient_data = {
      "calories": 0,
      "g fiber": 0,
      "g carbs": 0,
      "g sodium": 0,
      "g sugar": 0
    };
    this.songName = { songName: { plays: 1, minutes: 0, hours: 0 } };
    this.artists = { artistName: { plays: 1, minutes: 0, hours: 0 } };
    this.albums = { albums: { plays: 1, minutes: 0, hours: 0 } };
    this.lastMonth = [];
    this.lastHour = [];
    this.lastWeek = [];
    this.lastMonth = [];
  }

  // Called to calculate unit conversions when the selected unit is changed
  convertValue(value, currentUnit, newUnit) {
    if (
      !this.unit_list.includes(currentUnit) ||
      !this.unit_list.includes(newUnit)
    ) {
      return 0;
    }
    let result;
    currentUnit = currentUnit.trim();
    newUnit = newUnit.trim();

    if (this.global.stickerInfo.domain == "steps") {
      // average step distance = 2.5 feet
      if (currentUnit == "miles") {
        if (newUnit == "km") {
          result = value * 1.60934;
        } else if (newUnit == "steps") {
          result = Math.floor((value * 5280) / 2.5);
          return result;
        }
      } else if (currentUnit == "km") {
        if (newUnit == "miles") {
          result = value / 1.60934;
        } else if (newUnit == "steps") {
          result = Math.floor((value * 3280.8) / 2.5);
          return result;
        }
      } else {
        // currentUnit = 'steps'
        if (newUnit == "miles") {
          result = (value * 2.5) / 5280;
        } else if (newUnit == "km") {
          result = (value * 2.5) / 3280.8;
        }
      }
    } else if (this.global.stickerInfo.domain == "calories") {
      return this.nutrient_data[newUnit];
    } else if (this.global.stickerInfo.domain == "music") {
      // Average song playtime = 3.5 minutes
      if (currentUnit == "minutes") {
        if (newUnit == "hours") {
          result = value / 60;
        } else if (newUnit == "plays") {
          result = value / 3.5;
        }
      } else if (currentUnit == "hours") {
        if (newUnit == "minutes") {
          result = value * 60;
        } else if (newUnit == "plays") {
          result = (value * 60) / 3.5;
        }
      } else if (currentUnit == "plays") {
        if (newUnit == "minutes") {
          result = value * 3.5;
        } else if (newUnit == "hours") {
          result = (value * 3.5) / 60;
        }
      }
    } else if(this.global.stickerInfo.domain == "time") {
      if(currentUnit == "hour:minute") {
        if(newUnit == "days") {
          this.global.stickerInfo.hour = Math.floor(this.global.stickerInfo.hour/24);
          this.global.stickerInfo.min = 0; //Zero out minute field
          this.global.stickerInfo.goal_hour = Math.floor(this.global.stickerInfo.goal_hour/24);
          this.global.stickerInfo.goal_min = 0;
        } else if(newUnit == "seconds") {
          this.global.stickerInfo.hour = this.global.stickerInfo.hour*60*60 + this.global.stickerInfo.min*60;
          this.global.stickerInfo.min = 0;
          this.global.stickerInfo.goal_hour = this.global.stickerInfo.goal_hour*60*60 + this.global.stickerInfo.goal_min*60;
          this.global.stickerInfo.goal_min = 0;
        }
      } else if(currentUnit == "days") {
        if(newUnit == "hour:minute") {
          this.global.stickerInfo.hour = this.global.stickerInfo.hour*24;
          this.global.stickerInfo.min = 0;
          this.global.stickerInfo.goal_hour = this.global.stickerInfo.goal_hour*24;
          this.global.stickerInfo.goal_min = 0;
        } else if(newUnit == "seconds") {
          this.global.stickerInfo.hour = this.global.stickerInfo.hour*24*60*60;
          this.global.stickerInfo.min = 0;
          this.global.stickerInfo.goal_hour = this.global.stickerInfo.goal_hour*24*60*60;
          this.global.stickerInfo.goal_min = 0;
        }
      } else if(currentUnit == "seconds") {
        if(newUnit == "hour:minute") {
          var seconds = this.global.stickerInfo.hour;
          this.global.stickerInfo.hour = Math.floor(seconds/(60*60));
          this.global.stickerInfo.min = Math.floor(seconds/60)%60;
          seconds = this.global.stickerInfo.goal_hour;
          this.global.stickerInfo.goal_hour = Math.floor(seconds/(60*60));
          this.global.stickerInfo.goal_min = Math.floor(seconds/60)%60;
        } else if(newUnit == "days") {
          this.global.stickerInfo.hour = Math.floor(this.global.stickerInfo.hour/(24*60*60));
          this.global.stickerInfo.goal_hour = Math.floor(this.global.stickerInfo.goal_hour/(24*60*60));
        }
      }
      //Don't update the value for time unit, since it's still in MS.
      return value;
    }
    return result.toFixed(2);
  }

  // Bound to onChange event for input box
  updateInputValue() {
    if(this.global.stickerInfo.domain == "time") {
      if(this.global.stickerInfo.unit == "hour:minute") {
        this.global.stickerInfo.value = this.global.stickerInfo.hour*60*60*1000 + this.global.stickerInfo.min*60*1000;
        if(this.global.stickerInfo.hasGoal) {
          this.global.stickerInfo.goal = this.global.stickerInfo.goal_hour*60*60*1000 + this.global.stickerInfo.goal_min*60*1000;
        }
      } else if(this.global.stickerInfo.unit == "days") {
        //This is a hack that Daniel didn't fix because it would require a lot of different changes.this
        //The "hour" field is actually a day, so treat it accordingly. (24 hrs in a day, 60 mins in an hr, etc.)
        this.global.stickerInfo.value = this.global.stickerInfo.hour *24*60*60*1000;
        if(this.global.stickerInfo.hasGoal) {
          this.global.stickerInfo.goal = this.global.stickerInfo.goal_hour *24*60*60*1000;
        }
      } else if(this.global.stickerInfo.unit == "seconds") {
        //Seconds are similarly hacked, but just multiply by 1000 to get ms.
        this.global.stickerInfo.value = this.global.stickerInfo.hour * 1000;
        if(this.global.stickerInfo.hasGoal) {
          this.global.stickerInfo.goal = this.global.stickerInfo.hour * 1000;
        }
      }
    } else if(this.global.stickerInfo.domain == "music") {
      this.updateMusicInputValue();
    }

    this.changeInput.emit();
  }

  // Bound to onChange event for music input box
  updateMusicInputValue() {
    this.global.stickerInfo.unit = this.music_unit + " of " + String(this.music_category);
    //TODO: music value needs error checking
    this.changeInput.emit();
  }

  // Bound to onChange event for the unit selector
  unitChanged() {
    if (this.global.stickerInfo.unit == "custom") {
      this.presentCustomUnitPrompt();
    }
    if (this.selected_unit != undefined) {
      this.global.stickerInfo.value = this.convertValue(this.global.stickerInfo.value, this.selected_unit, this.global.stickerInfo.unit);
      this.global.stickerInfo.goal = this.convertValue(this.global.stickerInfo.goal, this.selected_unit, this.global.stickerInfo.unit);
    }
    this.updateInputValue();
    this.selected_unit = this.global.stickerInfo.unit;

    if(this.global.stickerInfo.domain == "music") {
      this.updateMusicInputValue();
    }

    this.changeInput.emit();
  }

  // Bound to click event for add/remove goal button
  toggleGoal() {
    //TODO: error handling really shouldn't be on the toggle goal button, but rather on the input fields themselves.
    if (this.global.stickerInfo.hasGoal) {
      this.global.stickerInfo.hasGoal = false;
      this.global.stickerInfo.goal = 0;
    } else {
      // Error prevention
      if (this.global.stickerInfo.domain == "time") {
        if (
          this.global.stickerInfo.min <= 0 &&
          this.global.stickerInfo.hour <= 0
        ) {
          this.presentErrorPrompt();
          return;
        }
        if (isNaN(this.global.stickerInfo.value)) {
          this.presentErrorPrompt2();
          return;
        }
      } else {
        if (
          this.global.stickerInfo.value <= 0 ||
          this.global.stickerInfo.value == undefined
        ) {
          this.presentErrorPrompt();
          return;
        }
        if (isNaN(this.global.stickerInfo.value)) {
          this.presentErrorPrompt2();
          return;
        }
      }

      this.global.stickerInfo.hasGoal = true;
      this.global.stickerInfo.goal = this.global.stickerInfo.value;
    }

    this.global.stickerInfo.toggleGoal();

    this.changeInput.emit("toggleGoal");
  }

  // Validates unit input, returns true if the input is valid
  validateUnitInput(unitInput: string): boolean {
    // length must <= 12
    if (unitInput.length == 0 || unitInput.length > 12) return false;
    // must not contain any non-alphanumeric characters
    const regex = /[^A-Za-z0-9]/;
    if (regex.test(unitInput) == true) return false;
    return true;
  }

  cancelledCustomUnitInput() {
    this.global.stickerInfo.unit = this.unit_list[0];
    this.changeInput.emit();
  }

  async presentCustomUnitPrompt() {
    const alert = await this.alertController.create({
      header: "Customize Unit",
      inputs: [
        {
          name: "name",
          type: "text",
          placeholder: "units",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
            this.cancelledCustomUnitInput();
          },
        },
        {
          text: "OK",
          handler: (data) => {
            // Validate the input
            let inputIsValid = this.validateUnitInput(data.name);
            if (inputIsValid == false) {
              alert.subHeader =
                "Error: Unit must be alphanumeric and max 12 characters";
              return false;
            } else {
              this.unit_list.push(data.name);
              this.global.stickerInfo.unit = data.name;
              this.changeInput.emit();
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async presentErrorPrompt() {
    const alert = await this.alertController.create({
      header: "Error: Amount must be greater than 0",
      buttons: [
        {
          text: "Got It!",
        },
      ],
    });
    await alert.present();
  }

  async presentErrorPrompt2() {
    const alert = await this.alertController.create({
      header: "Error: Amount must be numeric",
      buttons: [
        {
          text: "Got It!",
        },
      ],
    });
    await alert.present();
  }

  //Get all recenly played list including songs, artists and albums
  getPlaylist() {
    this.spotifyService
      .sendRequestToExpress("/recently-played")
      .then((data) => {
        console.log(data);
        if (data["items"] != null) {
          for (var song of data["items"]) {
            if (!Object.keys(this.songName).includes(song["track"]["name"])) {
              this.songName[song["track"]["name"]] = {
                plays: 1,
                minutes: 0,
                hours: 0,
              };
              this.songName[song["track"]["name"]]["minutes"] = Number(
                (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
              );
              this.songName[song["track"]["name"]]["hours"] = Number(
                (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
              );
            } else {
              this.songName[song["track"]["name"]]["plays"] += 1;
              this.songName[song["track"]["name"]]["minutes"] += Number(
                (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
              );
              this.songName[song["track"]["name"]]["hours"] += Number(
                (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
              );
            }

            for (var a of song["track"]["album"]["artists"]) {
              if (!Object.keys(this.artists).includes(a["name"])) {
                this.artists[a["name"]] = { plays: 1, minutes: 0, hours: 0 };
                this.artists[a["name"]]["minutes"] = Number(
                  (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
                );
                this.artists[a["name"]]["hours"] = Number(
                  (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
                );
              } else {
                this.artists[a["name"]]["plays"] += 1;
                this.artists[a["name"]]["minutes"] += Number(
                  (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
                );
                this.artists[a["name"]]["hours"] += Number(
                  (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
                );
              }
            }
            if (
              !Object.keys(this.albums).includes(song["track"]["album"]["name"])
            ) {
              this.albums[song["track"]["album"]["name"]] = {
                plays: 1,
                minutes: 0,
                hours: 0,
              };
              this.albums[song["track"]["album"]["name"]]["minutes"] = Number(
                (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
              );
              this.albums[song["track"]["album"]["name"]]["hours"] = Number(
                (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
              );
            } else {
              this.albums[song["track"]["album"]["name"]]["plays"] += 1;
              this.albums[song["track"]["album"]["name"]]["minutes"] += Number(
                (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
              );
              this.albums[song["track"]["album"]["name"]]["hours"] += Number(
                (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
              );
            }
          }
        }
        console.log("Got playlist");
        console.log(this.songName);
        console.log(this.albums);
        console.log(this.artists);
        console.log(data);
        this.getPlaylistOfDifferentTime(data);
        this.openSpotifyModal();
      });
  }

  getPlaylistOfDifferentTime(data){
    var before = new Date().getTime();
    //*1000 convert timestamp to unix time
    var lastHourTime = (parseInt(String((before - 60 * 60 * 1000)  / 1000)))*1000;
    var lastDayTime = (parseInt(String((before - 24 * 60 * 60 * 1000) / 1000)))*1000;
    var lastWeekTime = (parseInt(String((before - 7 * 24 * 60 * 60 * 1000) / 1000)))*1000;
    var lastMonthTime =  (parseInt(String((before - 30 * 24 * 60 * 60 * 1000) / 1000)))* 1000;

    let lastHourSongName = { songName: { plays: 1, minutes: 0, hours: 0 } };
    let lastHourArtists = { artistName: { plays: 1, minutes: 0, hours: 0 } };
    let lastHourAlbums = { albums: { plays: 1, minutes: 0, hours: 0 } };

    let lastDaySongName = { songName: { plays: 1, minutes: 0, hours: 0 } };
    let lastDayArtists = { artistName: { plays: 1, minutes: 0, hours: 0 } };
    let lastDayAlbums = { albums: { plays: 1, minutes: 0, hours: 0 } };

    let lastWeekSongName = { songName: { plays: 1, minutes: 0, hours: 0 } };
    let lastWeekArtists = { artistName: { plays: 1, minutes: 0, hours: 0 } };
    let lastWeekAlbums = { albums: { plays: 1, minutes: 0, hours: 0 } };

    let lastMonthSongName = { songName: { plays: 1, minutes: 0, hours: 0 } };
    let lastMonthArtists = { artistName: { plays: 1, minutes: 0, hours: 0 } };
    let lastMonthAlbums = { albums: { plays: 1, minutes: 0, hours: 0 } };

    if (data["items"] != null) {

      for (var song of data["items"]) {
        var playAt = new Date(song["played_at"]).getTime();
        // last hour
        console.log("time check",playAt,lastHourTime)
        if (playAt >= lastHourTime) {
          if (!Object.keys(lastHourSongName).includes(song["track"]["name"])) {
            lastHourSongName[song["track"]["name"]] = {
              plays: 1,
              minutes: 0,
              hours: 0,
            };
            lastHourSongName[song["track"]["name"]]["minutes"] = Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastHourSongName[song["track"]["name"]]["hours"] = Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          } else {
            lastHourSongName[song["track"]["name"]]["plays"] += 1;
            lastHourSongName[song["track"]["name"]]["minutes"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastHourSongName[song["track"]["name"]]["hours"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          }

          for (var a of song["track"]["album"]["artists"]) {
            if (!Object.keys(lastHourArtists).includes(a["name"])) {
              lastHourArtists[a["name"]] = { plays: 1, minutes: 0, hours: 0 };
              lastHourArtists[a["name"]]["minutes"] = Number(
                (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
              );
              lastHourArtists[a["name"]]["hours"] = Number(
                (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
              );
            } else {
              lastHourArtists[a["name"]]["plays"] += 1;
              lastHourArtists[a["name"]]["minutes"] += Number(
                (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
              );
              lastHourArtists[a["name"]]["hours"] += Number(
                (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
              );
            }
          }
          if (!Object.keys(lastHourAlbums).includes(song["track"]["album"]["name"])) {
            lastHourAlbums[song["track"]["album"]["name"]] = {
              plays: 1,
              minutes: 0,
              hours: 0,
            };
            lastHourAlbums[song["track"]["album"]["name"]]["minutes"] = Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastHourAlbums[song["track"]["album"]["name"]]["hours"] = Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          } else {
            lastHourAlbums[song["track"]["album"]["name"]]["plays"] += 1;
            lastHourAlbums[song["track"]["album"]["name"]]["minutes"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastHourAlbums[song["track"]["album"]["name"]]["hours"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          }

        }
        // last day
        if(playAt >= lastDayTime){
          if (!Object.keys(lastDaySongName).includes(song["track"]["name"])) {
            lastDaySongName[song["track"]["name"]] = {
              plays: 1,
              minutes: 0,
              hours: 0,
            };
            lastDaySongName[song["track"]["name"]]["minutes"] = Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastDaySongName[song["track"]["name"]]["hours"] = Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          } else {
            lastDaySongName[song["track"]["name"]]["plays"] += 1;
            lastDaySongName[song["track"]["name"]]["minutes"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastDaySongName[song["track"]["name"]]["hours"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          }

          for (var a of song["track"]["album"]["artists"]) {
            if (!Object.keys(lastDayArtists).includes(a["name"])) {
              lastDayArtists[a["name"]] = { plays: 1, minutes: 0, hours: 0 };
              lastDayArtists[a["name"]]["minutes"] = Number(
                (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
              );
              lastDayArtists[a["name"]]["hours"] = Number(
                (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
              );
            } else {
              lastDayArtists[a["name"]]["plays"] += 1;
              lastDayArtists[a["name"]]["minutes"] += Number(
                (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
              );
              lastDayArtists[a["name"]]["hours"] += Number(
                (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
              );
            }
          }
          if (!Object.keys(lastDayAlbums).includes(song["track"]["album"]["name"])) {
            lastDayAlbums[song["track"]["album"]["name"]] = {
              plays: 1,
              minutes: 0,
              hours: 0,
            };
            lastDayAlbums[song["track"]["album"]["name"]]["minutes"] = Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastDayAlbums[song["track"]["album"]["name"]]["hours"] = Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          } else {
            lastDayAlbums[song["track"]["album"]["name"]]["plays"] += 1;
            lastDayAlbums[song["track"]["album"]["name"]]["minutes"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastDayAlbums[song["track"]["album"]["name"]]["hours"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          }

        }
        //lastweek
        if(playAt >= lastWeekTime){
          if (!Object.keys(lastWeekSongName).includes(song["track"]["name"])) {
            lastWeekSongName[song["track"]["name"]] = {
              plays: 1,
              minutes: 0,
              hours: 0,
            };
            lastWeekSongName[song["track"]["name"]]["minutes"] = Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastWeekSongName[song["track"]["name"]]["hours"] = Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          } else {
            lastWeekSongName[song["track"]["name"]]["plays"] += 1;
            lastWeekSongName[song["track"]["name"]]["minutes"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastWeekSongName[song["track"]["name"]]["hours"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          }

          for (var a of song["track"]["album"]["artists"]) {
            if (!Object.keys(lastWeekArtists).includes(a["name"])) {
              lastWeekArtists[a["name"]] = { plays: 1, minutes: 0, hours: 0 };
              lastWeekArtists[a["name"]]["minutes"] = Number(
                (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
              );
              lastWeekArtists[a["name"]]["hours"] = Number(
                (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
              );
            } else {
              lastWeekArtists[a["name"]]["plays"] += 1;
              lastWeekArtists[a["name"]]["minutes"] += Number(
                (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
              );
              lastWeekArtists[a["name"]]["hours"] += Number(
                (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
              );
            }
          }
          if (!Object.keys(lastWeekAlbums).includes(song["track"]["album"]["name"])) {
            lastWeekAlbums[song["track"]["album"]["name"]] = {
              plays: 1,
              minutes: 0,
              hours: 0,
            };
            lastWeekAlbums[song["track"]["album"]["name"]]["minutes"] = Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastWeekAlbums[song["track"]["album"]["name"]]["hours"] = Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          } else {
            lastWeekAlbums[song["track"]["album"]["name"]]["plays"] += 1;
            lastWeekAlbums[song["track"]["album"]["name"]]["minutes"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastWeekAlbums[song["track"]["album"]["name"]]["hours"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          }

        }
        //last month
        if(playAt >= lastMonthTime){
          if (!Object.keys(lastMonthSongName).includes(song["track"]["name"])) {
            lastMonthSongName[song["track"]["name"]] = {
              plays: 1,
              minutes: 0,
              hours: 0,
            };
            lastMonthSongName[song["track"]["name"]]["minutes"] = Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastMonthSongName[song["track"]["name"]]["hours"] = Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          } else {
            lastMonthSongName[song["track"]["name"]]["plays"] += 1;
            lastMonthSongName[song["track"]["name"]]["minutes"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastMonthSongName[song["track"]["name"]]["hours"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          }

          for (var a of song["track"]["album"]["artists"]) {
            if (!Object.keys(lastMonthArtists).includes(a["name"])) {
              lastMonthArtists[a["name"]] = { plays: 1, minutes: 0, hours: 0 };
              lastMonthArtists[a["name"]]["minutes"] = Number(
                (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
              );
              lastMonthArtists[a["name"]]["hours"] = Number(
                (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
              );
            } else {
              lastMonthArtists[a["name"]]["plays"] += 1;
              lastMonthArtists[a["name"]]["minutes"] += Number(
                (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
              );
              lastMonthArtists[a["name"]]["hours"] += Number(
                (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
              );
            }
          }
          if (!Object.keys(lastMonthAlbums).includes(song["track"]["album"]["name"])) {
            lastMonthAlbums[song["track"]["album"]["name"]] = {
              plays: 1,
              minutes: 0,
              hours: 0,
            };
            lastMonthAlbums[song["track"]["album"]["name"]]["minutes"] = Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastMonthAlbums[song["track"]["album"]["name"]]["hours"] = Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          } else {
            lastMonthAlbums[song["track"]["album"]["name"]]["plays"] += 1;
            lastMonthAlbums[song["track"]["album"]["name"]]["minutes"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastMonthAlbums[song["track"]["album"]["name"]]["hours"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          }

        }

      }
      this.lastHour.push(lastHourSongName);
      this.lastHour.push(lastHourArtists);
      this.lastHour.push(lastHourAlbums);
      this.lastDay.push(lastDaySongName);
      this.lastDay.push(lastDayArtists);
      this.lastDay.push(lastDayAlbums);
      this.lastWeek.push(lastWeekSongName);
      this.lastWeek.push(lastWeekArtists);
      this.lastWeek.push(lastWeekAlbums);
      this.lastMonth.push(lastMonthSongName);
      this.lastMonth.push(lastMonthArtists);
      this.lastMonth.push(lastMonthAlbums);
    }

  }

  async presentHealthAlert(){
    let message;
    if (this.global.stickerInfo.domain == "calories") {
      message = 'Do you want to get your data from the Nutritionix food database?';
    }
    else {
      message = 'Do you want to get your data from HealthKit?';
    }

    const alert = await this.alertController.create({
      message: message,
      buttons: [
        {
          text: 'YES',
          handler: () => this.openModal()
        },
        {
          text: 'NO'
        }],
    })
    await alert.present();
  }

  async presentSpotifyAlert() {
    const alert = await this.alertController.create({
      message: 'Do you want to get your playlist from Spotify?',
      buttons: [
        {
          text: 'YES',
          handler: () => {
            this.storage.get('spotifyPermission')
            .then((value) => {
              if(value == false || value == null){
                console.log("open webpage");
                window.open("https://sticker-spotify.herokuapp.com/login", "_self");
                this.storage.set('spotifyPermission', true);
              }
              else {
                this.getPlaylist();
              }
            })
          }
        },
        {
          text: 'NO'
        }],
    })
    await alert.present();
  }

  async openSpotifyModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: "my-custom-class",
      id: "ModalPage",
      componentProps: {
        songName: this.songName,
        artists: this.artists,
        albums: this.albums,
        hour: this.lastHour,
        day: this.lastDay,
        week: this.lastWeek,
        month: this.lastMonth,
      },
    });

    modal.onDidDismiss().then(data => {
      console.log("InputComponent - get data from ModalPage");
      console.log(data);
      if (!data.data.dismissed) {
        console.log('data.data: ', data.data);

        this.global.stickerInfo.value = data.data.value;
        this.music_unit = data.data.unit;
        //TODO: remove this hack
        if(data.data.unit == 'times') {
          this.music_unit = 'plays';
        }
        this.music_category = data.data.title;
      }
    });
    console.log("check","day",this.lastDay,"hour",this.lastHour,"week",this.lastWeek,"month",this.lastMonth)
    return await modal.present();
  }


  async openModal() {
    const modal = await this.modalController.create({
      component: SelectDataModalPage,
      componentProps: {
        selectedUnit: this.selected_unit
      }
    });
    modal.onDidDismiss().then(data=>{
      if (this.global.stickerInfo.domain == "calories") {
        this.nutrient_data = data.data.sum;
        this.global.stickerInfo.value = this.nutrient_data[this.selected_unit];
      }
      else {
        this.global.stickerInfo.value = data.data.sum;
      }
      this.updateInputValue();
    })
    return await modal.present();
  }
}
