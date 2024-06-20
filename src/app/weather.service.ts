import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private city = new BehaviorSubject<string>('');
  private country = new BehaviorSubject<string>('');

  currentCity = this.city.asObservable();
  currentCountry = this.country.asObservable();

  constructor() {}

  changeCity(city: string) {
    this.city.next(city);
  }

  changeCountry(country: string) {
    this.country.next(country);
  }
}
