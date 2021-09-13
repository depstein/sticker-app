import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = environment.spotifyServerURL;

  constructor(private http:HttpClient) { }

  public sendRequestToExpress(endpoint:string):Promise<any> {
    var data = this.http.get(this.expressBaseUrl + endpoint).toPromise();
    return data;
  }
}
