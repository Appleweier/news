import { Component, OnInit } from '@angular/core';
import { GetWeatherService } from '../get-weather.service';
import axios from 'axios';

@Component({
  selector: 'app-notice-bar',
  templateUrl: './notice-bar.component.html',
  styleUrls: ['./notice-bar.component.css']
})
export class NoticeBarComponent implements OnInit {

  constructor(private getWeatherService: GetWeatherService) { }

  weatherInfo: string;
  private weatherUrl = 'https://www.tianqiapi.com/api?version=v6&appid=65643966&appsecret=9EUSnNnS&vue=1';  // URL to web api



  onClick() {
    console.log('1');
  }

  ngOnInit(): void {
    axios.get(this.weatherUrl)
      .then(response => {
        this.weatherInfo = '今天是' + response.data.date + response.data.city + response.data.wea
          + '现在的温度是' + response.data.tem + '空气质量' + response.data.air_level;
      })
      .catch(error => {
        console.log(error);
      });
  }

}
