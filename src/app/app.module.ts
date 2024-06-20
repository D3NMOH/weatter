import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [AppComponent, WeatherComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [Geolocation],
  bootstrap: [AppComponent],
})
export class AppModule {}
