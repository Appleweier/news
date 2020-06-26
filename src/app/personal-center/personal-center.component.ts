import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ModalService, ToastService, ModalRef } from 'ng-zorro-antd-mobile';

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

  showAlert() {
    this._modal.alert('登录!!', '同学你还没有登录哦，请先登录', [
      { text: '就不！', onPress: () => {
        console.log('cancel');
        this._toast.fail('不好意思，程序是我写的，你还必须得登录。。。。');
        this.router.navigateByUrl('login');

      } },
      { text: 'OK', onPress: () => {
        console.log('ok');
        this.router.navigateByUrl('login');
      }}
    ]);
  }

  showAlertMuchButtons(message) {
    this._modal.alert('Much Buttons', message, [
      { text: 'Button1', onPress: () => console.log('第0个按钮被点击了') },
      { text: 'Button2', onPress: () => console.log('第1个按钮被点击了') },
      { text: 'Button2', onPress: () => console.log('第2个按钮被点击了') }
    ]);
  }

  showPromise() {
    this._modal.alert('Delete', 'Are you sure???', [
      { text: 'Cancel', onPress: () => console.log('cancel') },
      {
        text: 'Ok',
        onPress: () =>
          new Promise(resolve => {
            this._toast.info('onPress Promise', 1000);
            setTimeout(resolve, 1000);
          }),
        style: {
          color: '#ffffff',
          background: '#00ff00'
        }
      }
    ]);
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
      // this.router.navigateByUrl('login');
      this.showAlert();

    }
  }

}
