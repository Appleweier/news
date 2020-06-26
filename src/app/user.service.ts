import { Injectable } from '@angular/core';
import { User } from './user';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = { id: 0, pwd: '', token: '', avatar: '', sno: 0, url: 'http://127.0.0.1:8080', username: '' };
  loginSno: number;
  loginPwd = '';
  errorInfo = '';
  userLogin(sno: number, pwd: string): boolean {
    this.setLoginInfo(sno, pwd);
    axios.post('127.0.0.1:8080/user/login', {
      loginSno: this.loginSno,
      loginPwd: this.loginPwd
    })
      .then(response => {
        if (response.data.result == 1) {
          this.user.token = response.data.token;
          console.log('success');
        }
      })
      .catch();
    return true;
  }

  getUsername(): string {
    return this.user.username;
  }

  getSno(): number {
    return this.user.sno;
  }

  getAvatar(): string {
    return this.user.avatar;
  }

  getPwd(): string {
    return this.user.pwd;
  }

  getToken(): string {
    return this.user.token;
  }

  getId(): number {
    return this.user.id;
  }

  setLoginInfo(sno: number, pwd: string): void {
    this.loginSno = name;
    this.loginPwd = pwd;
  }
  constructor() { }
}
