import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ModalService, ToastService, ModalRef } from 'ng-zorro-antd-mobile';
import axios from 'axios';

@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.css']
})
export class PersonalCenterComponent implements OnInit {
  sno: number;
  avatar: string;
  token: string;
  pwd: string;
  id: number;
  username: string;
  showPromptPromise() {
    this._modal.prompt(
      'input name',
      'please input your name',
      [
        {
          text: 'Close',
          onPress: value =>
            new Promise(resolve => {
              this._toast.info('onPress promise resolve', 1000);
              setTimeout(() => {
                resolve();
                console.log(`value:${value}`);
              }, 1000);
            })
        },
        {
          text: 'Hold on',
          onPress: value =>
            new Promise((resolve, reject) => {
              this._toast.info('onPress promise reject', 1000);
              setTimeout(() => {
                // reject();
                console.log(`value:${value}`);
              }, 1000);
            })
        }
      ],
      'default',
      null,
      ['input your name']
    );
  }


  professionalSearch() {
    this.router.navigateByUrl('ps');
  }
  showPromptDefault() {
    this._modal.prompt(
      'defaultValue',
      'defaultValue for prompt',
      [{ text: 'Cancel' }, { text: 'Submit', onPress: value => console.log(`输入的内容:${value}`) }],
      'default',
      ['100']
    );
  }

  showSecure() {
    this._modal.prompt('Password', 'Password Message', password => console.log(`password: ${password}`), 'secure-text');
  }

  showCustom() {
    this._modal.prompt(
      'Password',
      'You can custom buttons',
      [{ text: '取消' }, { text: '提交', onPress: password => console.log(`密码为:${password}`) }],
      'secure-text'
    );
  }

  showLogin() {
    this._modal.prompt(
      '修改密码',
      '请输入个人学号认证',
      (login, password) => {
        console.log(`login: ${login}, password: ${password}`);
        axios({
          method: 'POST',
          url: `${this.userService.user.url}/user/pwd`,
          data: {
            no: `${login}`,
            pwd: `${password}`
          },
          headers: {
            'Authorization': `${this.userService.user.token}`
          }
        }).then(e => {
          if (e.data.result == 1) {
            this._toast.info(`修改密码成功！`);
          } else if (e.data.result == -1) {
            this._toast.info(`这是你的学号吗？？！`);

          } else {
            this._toast.info(`修改密码失败！`);
          }
        }).catch(e => {
          this._toast.info(`网络延迟异常！`);

        });
      },
      'login-password',
      ['2017151518', '2017151518'],
      ['Please input name', 'Please input password']
    );
  }

  showAlert() {
    this._modal.alert('登录!!', '同学你还没有登录哦，请先登录', [
      {
        text: '就不！', onPress: () => {
          console.log('cancel');
          this._toast.fail('不好意思，程序是我写的，你还必须得登录。。。。');
          this.router.navigateByUrl('login');

        }
      },
      {
        text: 'OK', onPress: () => {
          console.log('ok');
          this.router.navigateByUrl('login');
        }
      }
    ]);
  }

  // showAlertMuchButtons(message) {
  //   this._modal.alert('Much Buttons', message, [
  //     { text: 'Button1', onPress: () => console.log('第0个按钮被点击了') },
  //     { text: 'Button2', onPress: () => console.log('第1个按钮被点击了') },
  //     { text: 'Button2', onPress: () => console.log('第2个按钮被点击了') }
  //   ]);
  // }

  // showPromise() {
  //   this._modal.alert('Delete', 'Are you sure???', [
  //     { text: 'Cancel', onPress: () => console.log('cancel') },
  //     {
  //       text: 'Ok',
  //       onPress: () =>
  //         new Promise(resolve => {
  //           this._toast.info('onPress Promise', 1000);
  //           setTimeout(resolve, 1000);
  //         }),
  //       style: {
  //         color: '#ffffff',
  //         background: '#00ff00'
  //       }
  //     }
  //   ]);
  // }


  getAvatar() {
    // console.log(data[0]);
    axios.post(`${this.userService.user.url}/user/getavatar`, {
      id: this.userService.user.id
    })
      .then(res => {
        this.avatar = res.data.avatar;
        this.userService.user.avatar = this.avatar;
      })
      .catch(err => {
        console.error(err);
      });
  }

  updateAvatar() {
    this.router.navigateByUrl('user/avatar');

  }

  // tslint:disable-next-line: variable-name
  constructor(private userService: UserService, private router: Router, private _toast: ToastService, private _modal: ModalService) { }

  ngOnInit(): void {
    this.sno = this.userService.getSno();
    this.avatar = this.userService.getAvatar();
    this.token = this.userService.getToken();
    this.pwd = this.userService.getPwd();
    this.id = this.userService.getId();
    this.username = this.userService.getUsername();
    if (this.userService.getSno() === 0) {
      // alert('同学你还没有登录哦，请先登录');
      this.router.navigateByUrl('login');
      this.showAlert();

    }
    this.getAvatar();
  }

}
