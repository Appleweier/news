import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  public city: string;
  public district: string;

  constructor() { }
}
