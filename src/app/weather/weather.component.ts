import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';

const apiKey = 'your-api-key';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  location: any;
  errorMsg: any;
  weatherName: string = '';
  weatherDesc: string = '';
  weatherTemp: any;
  weatherFeelTemp: any;
  weatherMinTemp: any;
  weatherMaxTemp: any;
  weatherHumidity: any;
  weatherPressure: any;
  weatherCity: any;
  weatherCountry: any;
  weatherCondition: any;
  weatherWind: any;
  weatherVisibility: any;
  forecastList: any;
  apiKey: any;

  constructor(private http: HttpClient, private geolocation: Geolocation) {}

  ngOnInit() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.location = resp;
        this.loadData();
        this.loadForecast();
        console.log(this.weatherCondition);
      })
      .catch((error) => {
        console.log('Error getting location', error);
        this.errorMsg = 'Permission to access location was denied';
      });
  }

  async loadData() {
    try {
      const response: any = await this.http
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${this.location.coords.latitude}&lon=${this.location.coords.longitude}&appid=${apiKey}&units=metric`
        )
        .toPromise();
      this.weatherName = response.weather[0].main;
      this.weatherDesc = response.weather[0].description;
      this.weatherTemp = Math.round(response.main.temp);
      this.weatherFeelTemp = Math.round(response.main.feels_like);
      this.weatherMinTemp = Math.round(response.main.temp_min);
      this.weatherMaxTemp = Math.round(response.main.temp_max);
      this.weatherHumidity = Math.round(response.main.humidity);
      this.weatherPressure = Math.round(response.main.pressure);
      this.weatherCity = response.name;
      this.weatherCountry = response.sys.country;
      this.weatherCondition = response.weather[0].icon;
      this.weatherWind = Math.round(response.wind.speed);
      this.weatherVisibility = Math.round(response.visibility);
    } catch (error) {
      console.log(error);
    }
  }
  async loadForecast() {
    try {
      const response: any = await this.http
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${this.location.coords.latitude}&lon=${this.location.coords.longitude}&appid=${apiKey}&units=metric`
        )
        .toPromise();
      this.forecastList = response.list.map((item: any, index: any) => ({
        ...item,
        index,
      }));

      console.log('Forecast', this.forecastList);
    } catch (error) {
      console.log(error);
    }
  }
  formatDay(dt: number): string {
    const day = new Date(dt * 1000);
    return day.toLocaleString('en-US', { day: 'numeric' });
  }
  formatMonth(dt: number): string {
    const month = new Date(dt * 1000);
    return month.toLocaleString('en-US', { month: 'short' });
  }
  formatWeekday(dt: number): string {
    const weekday = new Date(dt * 1000);
    return weekday.toLocaleString('en-US', { weekday: 'short' });
  }
  formatTime(dt: number): string {
    const time = new Date(dt * 1000);
    return time.toLocaleString('en-US', {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
    });
  }
  rounded(value: number) {
    return Math.round(value);
  }
}
