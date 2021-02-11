import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodDataService {

  constructor(private http: HttpClient) { }

  searchForFoodItems(query: string) {
    return this.http.get(
      'https://trackapi.nutritionix.com/v2/search/instant',
      {
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': environment.nutritionixID,
          'x-app-key': environment.nutritionixKey
        },
        params: {
          "query": query
        }
      }
    );
  }

  getFoodData(query: string) {
    return this.http.post(
      'https://trackapi.nutritionix.com/v2/natural/nutrients', {'query': query},
      {
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': environment.nutritionixID,
          'x-app-key': environment.nutritionixKey
        }
      }
    );
  }
}
