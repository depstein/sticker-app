import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodDataService {

  constructor(private http: HttpClient, private storage: Storage) {
  }

  hashCode(s:string):number {
    let h=0;
    for(let i = 0; i < s.length; i++) 
      h = Math.imul(31, h) + s.charCodeAt(i) | 0;

    return h;
  }

  searchForFoodItems(query: string) {
    return new Observable(subscriber => {
      this.storage.get('id').then(id => {
        //Get the user ID from storage, hash it, and then get that index from the stored ids
        let headers = environment.nutritionix.ids[this.hashCode(id) % environment.nutritionix.ids.length];
        headers['Content-Type'] = 'application/json';
        //Make API call with headers & params
        this.http.get(environment.nutritionix.searchURL, {
          headers: headers,
          params: {
            "query": query
          }
        }).subscribe(response => {
          //Pass response to observable
          subscriber.next(response);
        });
      });
    });
  }

  getFoodData(query: string) {
    return new Observable(subscriber => {
      this.storage.get('id').then(id => {
        //Get the user ID from storage, hash it, and then get that index from the stored ids
        let headers = environment.nutritionix.ids[this.hashCode(id) % environment.nutritionix.ids.length];
        headers['Content-Type'] = 'application/json';
        //Make API call with headers
        this.http.post(environment.nutritionix.nutrientsURL, {'query': query}, {
          headers: headers
        }).subscribe(response => {
          //Pass response to observable
          subscriber.next(response);
        });
      });
    });
  }
}
