import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodDataService {

  constructor(private http: HttpClient) { }

  getFoodData() {
    return this.http.get(
      'https://trackapi.nutritionix.com/v2/natural/nutrients',
      options: {
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': '67853ab2',
          'x-app-key': 'd27556fd8ab42acd7a7def7d91347f0e',
          'x-remote-user-id': '0'
        },
        params: {
          "query":"chicken nachos and milk"
        }
      }
    );
  }
}
