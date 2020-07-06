import { Component, OnInit } from '@angular/core';
import { ToastService } from 'ng-zorro-antd-mobile';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import axios from 'axios';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;
  sno: number;
  pwd = '';
  value = '';
  error = false;
  numberFocus = {
    focus: false,
    date: new Date()
  };
  inputFocus = {
    focus: false,
    date: new Date()
  };

  titleFocus = {
    focus: false,
    date: new Date()
  };
  autoFocus = { focus: true, date: new Date() };

  // tslint:disable-next-line: variable-name
  constructor(public authService: AuthService, private _toast: ToastService, private router: Router, private userService: UserService) {
    // this.setMessage();

  }

  inputErrorClick(e) {
    this._toast.info('Please enter 11 digits');
  }
  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  inputChange(e) {
    const value = e.replace(/\s/g, '');
    if (value.length < 11 && value.length > 0) {
      this.error = true;
    } else {
      this.error = false;
    }
    this.value = e;
  }

  clickFocus() {
    this.numberFocus = {
      focus: true,
      date: new Date()
    };
  }

  clickFocusInput() {
    this.inputFocus = {
      focus: true,
      date: new Date()
    };
  }

  clickTitle() {
    this.titleFocus = {
      focus: true,
      date: new Date()
    };
  }

  login(): boolean {
    console.log(this.sno + this.pwd);
    // this.userService.userLogin(this.sno, this.pwd);
    if (this.userService.user.token.length < 10) {
      axios.post(`${this.userService.user.url}/user/login`, {
        loginSno: this.sno,
        loginPwd: this.pwd.replace(/\s+/g, '')
      })
        .then(response => {
          if (response.data.result == 1) {
            this.userService.user.sno = this.sno;
            console.log('success');
            this.userService.user.id = response.data.id;
            this.userService.user.token = response.data.token;
            localStorage.setItem('token', response.data.token);
            this.userService.user.username = response.data.username;


            this.authService.isLoggedIn = true;
            this.router.navigateByUrl('personCenter');
            this._toast.info('Login Success');




          } else {
            this._toast.fail('Login Falid');

          }
        })
        .catch();
    } else {
      this._toast.info('请勿重复登录');

    }


    return true;
  }
  register(): void {

  }

  ngOnInit(): void {
  }

}
