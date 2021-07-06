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
    return this.http.get(environment.nutritionix.searchURL, {
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': environment.nutritionix.id,
        'x-app-key': environment.nutritionix.key
      },
      params: {
        "query": query
      }
    });
  }

  getFoodData(query: string) {
    return this.http.post(environment.nutritionix.nutrientsURL, {'query': query}, {
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': environment.nutritionix.id,
        'x-app-key': environment.nutritionix.key
      }
    });
  }
}
