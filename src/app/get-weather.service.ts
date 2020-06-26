import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class GetWeatherService {
  private weatherUrl = 'https://www.tianqiapi.com/api?version=v6&appid=65643966&appsecret=9EUSnNnS&vue=1';  // URL to web api
  constructor(private http: HttpClient) { }

  info = '';

  getWeather(): any {
    axios.get(this.weatherUrl)
      .then(e => {
        this.info = e.data;
      })
      .catch(error => {
        console.log(error);

      });

    return this.info;

  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
