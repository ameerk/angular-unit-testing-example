import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { CatFact } from '../app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CatFactsService {

  baseUrl = `https://cat-fact.herokuapp.com`

  constructor(private http: HttpClient) { }

  getRandomFact(): Observable<CatFact[]> {
    const url = `${this.baseUrl}/facts/random?animal_type=cat&amount=2`
    return this.http.get(url)
      .pipe(map(data => data as CatFact[]),
        catchError(error => {
          return this.processError(error);
        }))
  }

  private processError(error: Error) {
    console.log('Error fetching maintenance data', JSON.stringify(error, [0], 2));
    return throwError(error);
  }
}
