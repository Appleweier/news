import { Component, OnInit } from '@angular/core';
import { ToastService } from 'ng-zorro-antd-mobile';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormValidService } from '../form-valid.service';
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
      if (!this.valid.isPwd(this.pwd)) {
        this._toast.info('密码最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符');
        return;

      }

      if (!this.valid.isUsername(this.username)) {
        this._toast.info('用户名2到16位（字母，数字，下划线，减号）');
        return;

      }

      axios.post(this.userService.user.url + '/user/register', {
        no: this.no,
        pwd: this.pwd,
        username: this.username
      })
        .then(response => {
          if (response.data.result == 1) {
            this._toast.info('注册成功');
            this.router.navigateByUrl('/login');

          }
        })
        .catch();
    }
  }

  constructor(private valid: FormValidService, private _toast: ToastService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

}
