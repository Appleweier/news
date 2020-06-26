import { Component, OnInit } from '@angular/core';
import { ToastService } from 'ng-zorro-antd-mobile';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import axios from 'axios';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = null;
  no: number = null;
  pwd: string = null;
  register() {
    if (this.username === null || this.username === '' ||
      this.no === null ||
      this.pwd === null || this.pwd === '') {
      // this._toast.info(this.username + this.sno + this.pwd);
      this._toast.info('请不要输入空白');
    } else {
      axios.post(this.userService.user.url + '/user/register', {
        no: this.no,
        pwd: this.pwd,
        username: this.username
      })
        .then(response => {
          if (response.data.result == 1) {
            this._toast.info('注册成功');
          }
        })
        .catch();
    }
  }

  constructor(private _toast: ToastService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

}
