import { AlertController } from "@ionic/angular";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { GlobalDataService } from "./../global-data.service";
import { SpotifyService } from "../spotify.service";
import { ModalController } from "@ionic/angular";
import { ModalPage } from "../modals/modal/modal.page";
import { conditionallyCreateMapObjectLiteral } from "@angular/compiler/src/render3/view/util";

import { ChartModalPage } from "../chart-modal/chart-modal.page";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
})
export class InputComponent implements OnInit {
  unit_list: any[] = [];
  unit_copy: any[] = []; // Used for slider's *ngIf to check for custom unit
  selected_unit: string;
  custom: string;
  canAddGoal: boolean;
  goal: string;
  goal_str: string;
  hour_str: string;
  min_str: string;
  saved_value: number;
  saved_unit: string;
  max_slider_value: number;
  slider_input_value: number;
  slider_image_url: string;
  music_str: string;
  milsec: number;
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
    private spotifyService: SpotifyService,
    public modalController: ModalController
  ) {
    this.slider_input_value = 0;
    this.goal_str = "";
    this.goal = "ADD GOAL";
    this.custom = "custom";
    for (var type of this.global.image_dict[this.global.stickerInfo.domain]) {
      if (this.global.stickerInfo.image == type.sticker) {
        if (type.stickerType == "chartjunk") {
          this.canAddGoal = true;
        } else {
          this.canAddGoal = false;
        }
      }
    }
  }

  ngOnInit() {
    this.unit_list = this.unit_copy = Object.keys(
      this.global.domain_info[this.global.stickerInfo.domain].units
    );
    this.selected_unit = this.unit_list[0].trim();
    this.max_slider_value = this.global.domain_info[
      this.global.stickerInfo.domain
    ].units[this.global.stickerInfo.unit].maxAmount;
    this.slider_image_url = this.global.domain_info[
      this.global.stickerInfo.domain
    ].slider_image_url;
    this.songName = { songName: { times: 1, minutes: 0, hours: 0 } };
    this.artists = { artistName: { times: 1, minutes: 0, hours: 0 } };
    this.albums = { albums: { times: 1, minutes: 0, hours: 0 } };
    this.lastMonth = [];
    this.lastHour = [];
    this.lastWeek = [];
    this.lastMonth = [];
  }

  // Called to calculate unit conversions when the selected unit is changed
  convertValue(currentUnit, newUnit) {
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
          result = this.global.stickerInfo.value * 1.60934;
        } else if (newUnit == "steps") {
          result = (this.global.stickerInfo.value * 5280) / 2.5;
        }
      } else if (currentUnit == "km") {
        if (newUnit == "miles") {
          result = this.global.stickerInfo.value / 1.60934;
        } else if (newUnit == "steps") {
          result = (this.global.stickerInfo.value * 3280.8) / 2.5;
        }
      } else {
        // currentUnit = 'steps'
        if (newUnit == "miles") {
          result = (this.global.stickerInfo.value * 2.5) / 5280;
        } else if (newUnit == "km") {
          result = (this.global.stickerInfo.value * 2.5) / 3280.8;
        }
      }
    } else if (this.global.stickerInfo.domain == "music") {
      // Average song playtime = 3.5 minutes
      if (currentUnit == "minutes") {
        if (newUnit == "hours") {
          result = this.global.stickerInfo.value / 60;
        } else if (newUnit == "times") {
          result = this.global.stickerInfo.value / 3.5;
        }
      } else if (currentUnit == "hours") {
        if (newUnit == "minutes") {
          result = this.global.stickerInfo.value * 60;
        } else if (newUnit == "times") {
          result = (this.global.stickerInfo.value * 60) / 3.5;
        }
      } else if (currentUnit == "times") {
        if (newUnit == "minutes") {
          result = this.global.stickerInfo.value * 3.5;
        } else if (newUnit == "hours") {
          result = (this.global.stickerInfo.value * 3.5) / 60;
        }
      }
    } else {
      // time
      if (currentUnit == "hours") {
        if (newUnit == "minutes") {
          result = this.global.stickerInfo.value * 60;
        } else if (newUnit == "days") {
          result = this.global.stickerInfo.value / 24;
        }
      } else if (currentUnit == "minutes") {
        if (newUnit == "hours") {
          result = this.global.stickerInfo.value / 60;
        } else if (newUnit == "days") {
          result = this.global.stickerInfo.value / 60 / 24;
        }
      } else if (currentUnit == "days") {
        if (newUnit == "minutes") {
          result = this.global.stickerInfo.value * 24 * 60;
        } else if (newUnit == "hours") {
          result = this.global.stickerInfo.value * 24;
        }
      }
    }
    if (result != null) {
      return result.toFixed(2);
    }
  }

  // Bound to onChange event for input box
  updateInputValue() {
    if (
      this.global.stickerInfo.domain == "time" &&
      this.global.stickerInfo.unit == "hour:minute"
    ) {
      this.slider_input_value =
        this.global.stickerInfo.hour * 60 + this.global.stickerInfo.min;
      this.milsec = this.slider_input_value * 60000;
    } else {
      this.slider_input_value = this.global.stickerInfo.value;
    }

    if (this.global.stickerInfo.hasGoal) {
      // If a goal has been created it must be updated
      if (this.global.stickerInfo.domain == "music") {
        this.goal_str =
          String(this.global.stickerInfo.value) +
          " " +
          this.selected_unit +
          " of " +
          String(this.global.stickerInfo.music_value);
      } else {
        this.goal_str = String(this.global.stickerInfo.value);
      }
      this.global.stickerInfo.goal = this.global.stickerInfo.value;
    }
  }

  // Bound to onChange event for music input box
  updateMusicInputValue() {}

  // Bound to onChange event for the unit selector
  unitChanged() {
    if (this.global.stickerInfo.unit == "custom") {
      this.presentCustomUnitPrompt();
    }
    if (this.selected_unit != undefined) {
      // Saves the value so that conversions don't mess up original input (mostly for steps)
      if (this.saved_value == undefined) {
        this.saved_value = this.global.stickerInfo.value;
        this.saved_unit = this.selected_unit;
      } else {
        if (this.global.stickerInfo.unit == this.saved_unit) {
          this.global.stickerInfo.value = this.saved_value;
          this.selected_unit = this.saved_unit;
          this.updateInputValue();
          this.max_slider_value = this.global.domain_info[
            this.global.stickerInfo.domain
          ].units[this.selected_unit].maxAmount;
          return;
        }
      }
      this.global.stickerInfo.value = this.convertValue(
        this.selected_unit,
        this.global.stickerInfo.unit
      );
    }
    this.updateInputValue();
    this.selected_unit = this.global.stickerInfo.unit;

    if (this.unit_copy.includes(this.selected_unit)) {
      this.max_slider_value = this.global.domain_info[
        this.global.stickerInfo.domain
      ].units[this.selected_unit].maxAmount;
    }
  }

  // Bound to onChange event for slider
  updateInputValueFromSlider() {
    if (
      this.slider_input_value >= 0 &&
      this.slider_input_value <= this.max_slider_value
    ) {
      if (
        this.global.stickerInfo.domain == "time" &&
        this.global.stickerInfo.unit == "hour:minute"
      ) {
        this.global.stickerInfo.hour = Math.floor(this.slider_input_value / 60);
        this.global.stickerInfo.min = this.slider_input_value % 60;
      }
      this.global.stickerInfo.value = this.slider_input_value;
    }
    if (this.global.stickerInfo.hasGoal) {
      this.global.stickerInfo.goal = this.slider_input_value;
    }
  }

  // Bound to click event for add/remove goal button
  toggleGoal() {
    if (this.goal == "REMOVE") {
      this.goal = "ADD GOAL";
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

      this.goal = "REMOVE";
      this.global.stickerInfo.hasGoal = true;
      this.global.stickerInfo.goal = this.global.stickerInfo.value;
      if (this.global.stickerInfo.domain == "music") {
        this.goal_str = String(this.global.stickerInfo.value);
        this.music_str =
          this.selected_unit +
          " of " +
          String(this.global.stickerInfo.music_value);
      } else if (
        this.global.stickerInfo.domain == "time" &&
        this.global.stickerInfo.unit == "hour:minute"
      ) {
        this.hour_str = String(this.global.stickerInfo.hour);
        this.min_str = String(this.global.stickerInfo.min);
      } else {
        this.goal_str = String(this.global.stickerInfo.value);
      }
    }
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
  getplaylist() {
    var before = new Date().getTime();
    //*1000 convert timestamp to unix time
    var lastHourTime =
      parseInt(String((before - 60 * 60 * 1000) / 1000)) * 1000;
    var lastDayTime =
      parseInt(String((before - 24 * 60 * 60 * 1000) / 1000)) * 1000;
    var lastWeekTime =
      parseInt(String((before - 7 * 24 * 60 * 60 * 1000) / 1000)) * 1000;
    var lastMonthTime =
      parseInt(String((before - 30 * 24 * 60 * 60 * 1000) / 1000)) * 1000;

    this.spotifyService
      .sendRequestToExpress("/recently-played")
      .then((data) => {
        if (data["items"] != null) {
          for (var song of data["items"]) {
            if (!Object.keys(this.songName).includes(song["track"]["name"])) {
              this.songName[song["track"]["name"]] = {
                times: 1,
                minutes: 0,
                hours: 0,
                chart: { hour: [], day: [], week: [], month: [] },
              };
              this.songName[song["track"]["name"]]["minutes"] = Number(
                (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
              );
              this.songName[song["track"]["name"]]["hours"] = Number(
                (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
              );
              var playAt = new Date(song["played_at"]).getTime();
              if (playAt >= lastHourTime) {
                //times of playing = number of object
                this.songName[song["track"]["name"]]["chart"]["hour"].push({
                  t: song["played_at"],
                  minute: song["track"]["duration_ms"] / 1000 / 60,
                  hour: song["track"]["duration_ms"] / 1000 / 60 / 60,
                });
              }
              if (playAt >= lastDayTime) {
                this.songName[song["track"]["name"]]["chart"]["day"].push({
                  t: song["played_at"],
                  minute: song["track"]["duration_ms"] / 1000 / 60,
                  hour: song["track"]["duration_ms"] / 1000 / 60 / 60,
                });
              }
              if (playAt >= lastWeekTime) {
                this.songName[song["track"]["name"]]["chart"]["week"].push({
                  t: song["played_at"],
                  minute: song["track"]["duration_ms"] / 1000 / 60,
                  hour: song["track"]["duration_ms"] / 1000 / 60 / 60,
                });
              }
              if (playAt >= lastMonthTime) {
                this.songName[song["track"]["name"]]["chart"]["month"].push({
                  t: song["played_at"],
                  minute: song["track"]["duration_ms"] / 1000 / 60,
                  hour: song["track"]["duration_ms"] / 1000 / 60 / 60,
                });
              }
            } else {
              this.songName[song["track"]["name"]]["times"] += 1;
              this.songName[song["track"]["name"]]["minutes"] += Number(
                (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
              );
              this.songName[song["track"]["name"]]["hours"] += Number(
                (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
              );
              if (playAt >= lastHourTime) {
                //times of playing = number of object
                this.songName[song["track"]["name"]]["chart"]["hour"].push({
                  t: song["played_at"],
                  minute: song["track"]["duration_ms"] / 1000 / 60,
                  hour: song["track"]["duration_ms"] / 1000 / 60 / 60,
                });
              }
              if (playAt >= lastDayTime) {
                this.songName[song["track"]["name"]]["chart"]["day"].push({
                  t: song["played_at"],
                  minute: song["track"]["duration_ms"] / 1000 / 60,
                  hour: song["track"]["duration_ms"] / 1000 / 60 / 60,
                });
              }
              if (playAt >= lastWeekTime) {
                this.songName[song["track"]["name"]]["chart"]["week"].push({
                  t: song["played_at"],
                  minute: song["track"]["duration_ms"] / 1000 / 60,
                  hour: song["track"]["duration_ms"] / 1000 / 60 / 60,
                });
              }
              if (playAt >= lastMonthTime) {
                this.songName[song["track"]["name"]]["chart"]["month"].push({
                  t: song["played_at"],
                  minute: song["track"]["duration_ms"] / 1000 / 60,
                  hour: song["track"]["duration_ms"] / 1000 / 60 / 60,
                });
              }
            }

            for (var a of song["track"]["album"]["artists"]) {
              if (!Object.keys(this.artists).includes(a["name"])) {
                this.artists[a["name"]] = { times: 1, minutes: 0, hours: 0 };
                this.artists[a["name"]]["minutes"] = Number(
                  (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
                );
                this.artists[a["name"]]["hours"] = Number(
                  (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
                );
              } else {
                this.artists[a["name"]]["times"] += 1;
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
                times: 1,
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
              this.albums[song["track"]["album"]["name"]]["times"] += 1;
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
        this.presentModal();
      });
  }

  getPlaylistOfDifferentTime(data) {
    var before = new Date().getTime();
    //*1000 convert timestamp to unix time
    var lastHourTime =
      parseInt(String((before - 60 * 60 * 1000) / 1000)) * 1000;
    var lastDayTime =
      parseInt(String((before - 24 * 60 * 60 * 1000) / 1000)) * 1000;
    var lastWeekTime =
      parseInt(String((before - 7 * 24 * 60 * 60 * 1000) / 1000)) * 1000;
    var lastMonthTime =
      parseInt(String((before - 30 * 24 * 60 * 60 * 1000) / 1000)) * 1000;

    let lastHourSongName = { songName: { times: 1, minutes: 0, hours: 0 } };
    let lastHourArtists = { artistName: { times: 1, minutes: 0, hours: 0 } };
    let lastHourAlbums = { albums: { times: 1, minutes: 0, hours: 0 } };

    let lastDaySongName = { songName: { times: 1, minutes: 0, hours: 0 } };
    let lastDayArtists = { artistName: { times: 1, minutes: 0, hours: 0 } };
    let lastDayAlbums = { albums: { times: 1, minutes: 0, hours: 0 } };

    let lastWeekSongName = { songName: { times: 1, minutes: 0, hours: 0 } };
    let lastWeekArtists = { artistName: { times: 1, minutes: 0, hours: 0 } };
    let lastWeekAlbums = { albums: { times: 1, minutes: 0, hours: 0 } };

    let lastMonthSongName = { songName: { times: 1, minutes: 0, hours: 0 } };
    let lastMonthArtists = { artistName: { times: 1, minutes: 0, hours: 0 } };
    let lastMonthAlbums = { albums: { times: 1, minutes: 0, hours: 0 } };

    if (data["items"] != null) {
      for (var song of data["items"]) {
        var playAt = new Date(song["played_at"]).getTime();
        // last hour
        console.log("time check", playAt, lastHourTime);
        if (playAt >= lastHourTime) {
          if (!Object.keys(lastHourSongName).includes(song["track"]["name"])) {
            lastHourSongName[song["track"]["name"]] = {
              times: 1,
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
            lastHourSongName[song["track"]["name"]]["times"] += 1;
            lastHourSongName[song["track"]["name"]]["minutes"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastHourSongName[song["track"]["name"]]["hours"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          }

          for (var a of song["track"]["album"]["artists"]) {
            if (!Object.keys(lastHourArtists).includes(a["name"])) {
              lastHourArtists[a["name"]] = { times: 1, minutes: 0, hours: 0 };
              lastHourArtists[a["name"]]["minutes"] = Number(
                (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
              );
              lastHourArtists[a["name"]]["hours"] = Number(
                (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
              );
            } else {
              lastHourArtists[a["name"]]["times"] += 1;
              lastHourArtists[a["name"]]["minutes"] += Number(
                (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
              );
              lastHourArtists[a["name"]]["hours"] += Number(
                (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
              );
            }
          }
          if (
            !Object.keys(lastHourAlbums).includes(
              song["track"]["album"]["name"]
            )
          ) {
            lastHourAlbums[song["track"]["album"]["name"]] = {
              times: 1,
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
            lastHourAlbums[song["track"]["album"]["name"]]["times"] += 1;
            lastHourAlbums[song["track"]["album"]["name"]]["minutes"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastHourAlbums[song["track"]["album"]["name"]]["hours"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          }
        }
        // last day
        if (playAt >= lastDayTime) {
          if (!Object.keys(lastDaySongName).includes(song["track"]["name"])) {
            lastDaySongName[song["track"]["name"]] = {
              times: 1,
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
            lastDaySongName[song["track"]["name"]]["times"] += 1;
            lastDaySongName[song["track"]["name"]]["minutes"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastDaySongName[song["track"]["name"]]["hours"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          }

          for (var a of song["track"]["album"]["artists"]) {
            if (!Object.keys(lastDayArtists).includes(a["name"])) {
              lastDayArtists[a["name"]] = { times: 1, minutes: 0, hours: 0 };
              lastDayArtists[a["name"]]["minutes"] = Number(
                (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
              );
              lastDayArtists[a["name"]]["hours"] = Number(
                (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
              );
            } else {
              lastDayArtists[a["name"]]["times"] += 1;
              lastDayArtists[a["name"]]["minutes"] += Number(
                (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
              );
              lastDayArtists[a["name"]]["hours"] += Number(
                (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
              );
            }
          }
          if (
            !Object.keys(lastDayAlbums).includes(song["track"]["album"]["name"])
          ) {
            lastDayAlbums[song["track"]["album"]["name"]] = {
              times: 1,
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
            lastDayAlbums[song["track"]["album"]["name"]]["times"] += 1;
            lastDayAlbums[song["track"]["album"]["name"]]["minutes"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastDayAlbums[song["track"]["album"]["name"]]["hours"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          }
        }
        //lastweek
        if (playAt >= lastWeekTime) {
          if (!Object.keys(lastWeekSongName).includes(song["track"]["name"])) {
            lastWeekSongName[song["track"]["name"]] = {
              times: 1,
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
            lastWeekSongName[song["track"]["name"]]["times"] += 1;
            lastWeekSongName[song["track"]["name"]]["minutes"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastWeekSongName[song["track"]["name"]]["hours"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          }

          for (var a of song["track"]["album"]["artists"]) {
            if (!Object.keys(lastWeekArtists).includes(a["name"])) {
              lastWeekArtists[a["name"]] = { times: 1, minutes: 0, hours: 0 };
              lastWeekArtists[a["name"]]["minutes"] = Number(
                (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
              );
              lastWeekArtists[a["name"]]["hours"] = Number(
                (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
              );
            } else {
              lastWeekArtists[a["name"]]["times"] += 1;
              lastWeekArtists[a["name"]]["minutes"] += Number(
                (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
              );
              lastWeekArtists[a["name"]]["hours"] += Number(
                (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
              );
            }
          }
          if (
            !Object.keys(lastWeekAlbums).includes(
              song["track"]["album"]["name"]
            )
          ) {
            lastWeekAlbums[song["track"]["album"]["name"]] = {
              times: 1,
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
            lastWeekAlbums[song["track"]["album"]["name"]]["times"] += 1;
            lastWeekAlbums[song["track"]["album"]["name"]]["minutes"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastWeekAlbums[song["track"]["album"]["name"]]["hours"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          }
        }
        //last month
        if (playAt >= lastMonthTime) {
          if (!Object.keys(lastMonthSongName).includes(song["track"]["name"])) {
            lastMonthSongName[song["track"]["name"]] = {
              times: 1,
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
            lastMonthSongName[song["track"]["name"]]["times"] += 1;
            lastMonthSongName[song["track"]["name"]]["minutes"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
            );
            lastMonthSongName[song["track"]["name"]]["hours"] += Number(
              (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
            );
          }

          for (var a of song["track"]["album"]["artists"]) {
            if (!Object.keys(lastMonthArtists).includes(a["name"])) {
              lastMonthArtists[a["name"]] = { times: 1, minutes: 0, hours: 0 };
              lastMonthArtists[a["name"]]["minutes"] = Number(
                (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
              );
              lastMonthArtists[a["name"]]["hours"] = Number(
                (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
              );
            } else {
              lastMonthArtists[a["name"]]["times"] += 1;
              lastMonthArtists[a["name"]]["minutes"] += Number(
                (song["track"]["duration_ms"] / 1000 / 60).toFixed(2)
              );
              lastMonthArtists[a["name"]]["hours"] += Number(
                (song["track"]["duration_ms"] / 1000 / 60 / 60).toFixed(2)
              );
            }
          }
          if (
            !Object.keys(lastMonthAlbums).includes(
              song["track"]["album"]["name"]
            )
          ) {
            lastMonthAlbums[song["track"]["album"]["name"]] = {
              times: 1,
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
            lastMonthAlbums[song["track"]["album"]["name"]]["times"] += 1;
            lastMonthAlbums[song["track"]["album"]["name"]][
              "minutes"
            ] += Number((song["track"]["duration_ms"] / 1000 / 60).toFixed(2));
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
  getChartInfo() {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: "my-custom-class",
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
    console.log(
      "check",
      "day",
      this.lastDay,
      "hour",
      this.lastHour,
      "week",
      this.lastWeek,
      "month",
      this.lastMonth
    );
    return await modal.present();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ChartModalPage,
    });
    modal.onDidDismiss().then((data) => {
      this.global.stickerInfo.value = data.data.sum;
      this.updateInputValue();
    });
    return await modal.present();
  }
}
