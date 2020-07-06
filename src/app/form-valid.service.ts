import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormValidService {

  isEnmpty(str: string): boolean {
    let flag = false;
    str = str.replace(/\s+/g, '');
    if (str.length === 0 || str === null) {
      flag = true;
    }
    return flag;
  }

  isPwd(str: string): boolean {
    let flag = false;
    const regPwd = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;

    if (regPwd.test(str.replace(/\s+/g, ''))) {
      flag = true;
    }
    return flag;
  }

  isUsername(str: string): boolean {
    let flag = false;
    const username = /^[\u4E00-\u9FA5a-zA-Z0-9_-]{2,16}$/;
    if (username.test(str.replace(/\s+/g, ''))) {
      flag = true;
    }
    return flag;
  }

  constructor() { }
}
