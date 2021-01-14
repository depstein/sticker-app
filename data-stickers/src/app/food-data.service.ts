import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodDataService {

  constructor(private http: HttpClient) { }

  getFoodData(query: string) {
    return this.http.get(
      'https://trackapi.nutritionix.com/v2/search/instant',
      {
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': '67853ab2',
          'x-app-key': 'd27556fd8ab42acd7a7def7d91347f0e'
        },
        params: {
          "query": query
        }
      }
    );
  }
}
