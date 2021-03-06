import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import axios from 'axios';
import { ToastService } from 'ng-zorro-antd-mobile';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { WeatherService } from '../weather.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isLogined: boolean = (this.userService.user.token.length > 10);

  state = {
    selected: ''
  };
  constructor(
    public authService: AuthService,
    private location: Location,
    private ws: WeatherService,
    private router: Router,
    private userService: UserService,
    private _toast: ToastService
  ) { }
  onLogoutClick() {
    axios({
      method: 'DELETE',
      url: `${this.userService.user.url}/user/out`,
      data: {
        id: this.userService.user.id
      },
      headers: {
        Authorization: `${this.userService.user.token}`
      }
    }).then(e => {
      if (e.data.result == 1) {
        this._toast.info(`Logout Success!`);
        this.authService.isLoggedIn = false;
        localStorage.removeItem('token');
        this.userService.user.id = 0;
        this.userService.user.sno = 0;
        this.userService.user.pwd = '';
        this.userService.user.token = '';
        this.userService.user.username = '';
        // this.router.navigateByUrl('/dashboard/news');
        this.location.back();



      } else {
        this._toast.info(`Logout Faild!`);

      }
    }).catch(() => {
      this._toast.info(`网络延迟异常！`);

    });

  }

  onLeftClick() {
    console.log('onLeftClick');
    this.router.navigateByUrl('login');
  }
  onSelect(event) {
    this.isLogined = (this.userService.user.token.length > 10);
    console.log(event);
  }

  onVisibleChange(event) {
    this.isLogined = (this.userService.user.token.length > 10);
    console.log(event);
  }

  ngOnInit(): void {
    console.log('sd');
    console.log(localStorage.getItem('token'));
    axios.post(`${this.userService.user.url}/user/login`, {
      token: localStorage.getItem('token')
    })
      .then(res => {
        console.log(res.data);
        if (res.data.result == 1) {
          this.authService.isLoggedIn = true;
          this.userService.user.sno = res.data.sno;
          this.userService.user.username = res.data.name;
          this.userService.user.id = res.data.id;
          this._toast.info('Login Success');
          this.userService.user.token = localStorage.getItem('token');


        }
      })
      .catch(err => {
        console.error(err);
      });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(`纬度=${position.coords.latitude}  经度=${position.coords.longitude}`);
      });
    }
  }

}
