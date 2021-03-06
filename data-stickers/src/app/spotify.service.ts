import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  public sendRequestToExpress(endpoint:string):Promise<any> {
    var data = this.http.get(this.expressBaseUrl + endpoint).toPromise();
    console.log(data);
    return data;
  }
}
