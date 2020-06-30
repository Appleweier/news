import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastService } from 'ng-zorro-antd-mobile';
import { Location } from '@angular/common';

import axios from 'axios';

const data = [
  {
    url: ''
  }
];
@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.css']
})
export class ImagePickerComponent implements OnInit {

  files = data.slice(0);
  multiple = false;
  multipleTab = 0;
  avatar: string;

  // changeMultiple(value: number) {
  //   this.multipleTab = value;
  // }
  goBack(): void {
    this.location.back();
  }
  fileChange(params) {
    console.log(params);
    const { files, type, index } = params;
    this.files = files;
    console.log(files[0].url);
    data[0] = files[0].url;
  }
  updateAvatar() {
    console.log('clickme!');
    axios.post(`${this.userService.user.url}/user/avatar`, {
      avatar: data[0],
      id: this.userService.user.id
    })
      .then(res => {
        // console.log(res.data.result);
        if (res.data.result == 1) {
          this._toast.info('更改头像成功！');
        } else {
          this._toast.info('更改头像失败！');

        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  // imageClick(params) {
  //   console.log(params);
  // }



  constructor(private location: Location, private userService: UserService, private _toast: ToastService) { }

  ngOnInit(): void {

  }

}
