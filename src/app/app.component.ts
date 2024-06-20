import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-test';
  city: string = '';
  country: string = '';

  constructor(
    private weatherService: WeatherService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.weatherService.currentCity
      // .pipe(filter((city) => !!city))
      .subscribe((city) => {
        this.city = city;
        this.changeDetector.detectChanges();
      });
    this.weatherService.currentCountry
      // .pipe(filter((country) => !!country))
      .subscribe((country) => {
        this.country = country;
        this.changeDetector.detectChanges();
      });
  }
}
