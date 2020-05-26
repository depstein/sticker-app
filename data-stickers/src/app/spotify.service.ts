import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  BASE_URL = "https://accounts.spotify.com";
  AUTHORIZE_ENDPOINT = "/authorize";

  constructor(private http: HttpClient) { }

  public get_authorize() {
    return this.http.get(this.BASE_URL + this.AUTHORIZE_ENDPOINT);
  }



}
