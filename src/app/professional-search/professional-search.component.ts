import { Component, ViewEncapsulation } from '@angular/core';
import { ToastService } from 'ng-zorro-antd-mobile';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <--- JavaScript import from Angular
import axios from 'axios';
@Component({
  selector: 'app-professional-search',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="am-list-headerr">时间选择</div>

    <List [className]="'date-picker-list'">
      <ListItem
        DatePicker
        [arrow]="'horizontal'"
        [mode]="'datetime'"
        [(ngModel)]="startValue"
        (onOk)="onSOk($event)"
      >
        开始时间
        <Brief>{{ sname }}</Brief>
      </ListItem>
      <ListItem
        DatePicker
        [arrow]="'horizontal'"
        [mode]="'datetime'"
        [(ngModel)]="endValue"
        (onOk)="onEOk($event)"
      >
        结束时间
        <Brief>{{ ename }}</Brief>
      </ListItem>
    </List>
    <div>
      <List [renderHeader]="renderHeader">
        <RadioItemGroup [(ngModel)]="selectedStatus1.value" (onChange)="onChange($event)">
          <RadioItem *ngFor="let i of data" [name]="i.name" [value]="i.value">
            {{ i.name }}
          </RadioItem>
        </RadioItemGroup>
      </List>
    </div>

    <div class="am-demo-pager">
      <div class="am-listr" style="margin:0;">
        <div class="am-list-headerr">根据标题内容搜索</div>
        <div class="am-list-bodyr">

          <InputItem [(ngModel)]="title"  [clear]="true" [placeholder]="'auto focus'" [focus]="autoFocus" [content]="'标题'"></InputItem>
          <InputItem
            [clear]="true"
            [placeholder]="'click the button below to focus'"
            [focus]="inputFocus"
            [content]="'内容'"
            [(ngModel)]="content"
          >
          </InputItem>
          <div class="am-list-itemr am-list-item-middler">
            <div class="am-list-liner">
              <div
                class="am-list-contentr"
                style="width:100%;color:#108ee9;text-align:center"
                (click)="clickFocusInput()"
              >
                click to focus
              </div>
            </div>
            <div class="am-list-rippler" style="display: none;"></div>
          </div>
        </div>
      </div>
    </div>

    <WhiteSpace></WhiteSpace>
      <div Button [type]="'primary'" (onClick)="onClick()">搜索</div>
      <WhiteSpace></WhiteSpace>
  `,
  styles: [
    `
      .date-picker-list .am-list-item .am-list-line .am-list-extra {
        flex-basis: initial;
      }

      /deep/ .my-radio .am-radio {
        padding: 2.5px;
        border: 1px solid #ccc;
        border-radius: 50%;
        margin-right: 5px;
        box-sizing: initial;
      }

      .am-list-bodyr {
        position: relative;
        background-color: #fff;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
      }
      .am-list-headerr {
        padding: 15px 15px 9px 15px;
        font-size: 14px;
        color: #888;
        width: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
      /deep/ .am-list-bodyr InputItem:not(:last-child) .am-list-liner {
        border-bottom: 1px solid #ddd;
      }

      .am-list-itemr .am-list-liner .am-list-contentr {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        color: #000;
        font-size: 17px;
        line-height: 1.5;
        text-align: left;
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-top: 7px;
        padding-bottom: 7px;
      }

    `
  ]
})
export class ProfessionalSearchComponent {
  content = '';
  title = '';
  newsType = 0;
  startValue = new Date();
  endValue = new Date();
  disabled = true;
  selectedStatus1 = { value: 0, name: '校园' };
  selectedStatus2 = { value: 0, name: 'basketball', extra: 'details' };
  data = [{ value: 0, name: '校园' }, { value: 1, name: 'IT' }];
  data2 = [{ value: 0, name: 'basketball', extra: 'details' }, { value: 1, name: 'football', extra: 'details' }];
  sname = '';
  ename = '';
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
  constructor(private router: Router, private _toast: ToastService, private formModel: FormsModule, private userService: UserService
  ) { }



  onClick() {

    localStorage.setItem('st', this.sname);
    localStorage.setItem('et', this.ename);
    localStorage.setItem('type', String(this.newsType));
    localStorage.setItem('title', this.title);
    localStorage.setItem('content', this.content);
    this.router.navigateByUrl('search/detail');

    // console.log('click');
    // console.log(`开始时间${this.sname},结束时间${this.ename},新闻类型${this.newsType},标题${this.title},内容${this.content}`);

  }

  inputErrorClick(e) {
    this._toast.info('Please enter 11 digits');
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

  currentDateFormat(date, format: string = 'yyyy-mm-dd HH:MM:ss'): any {
    const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
    return format
      .replace('yyyy', date.getFullYear())
      .replace('mm', pad(date.getMonth() + 1))
      .replace('dd', pad(date.getDate()))
      .replace('HH', pad(date.getHours()))
      .replace('MM', pad(date.getMinutes()))
      .replace('ss', pad(date.getSeconds()));
  }

  onSOk(result: Date) {

    const now = this.currentDateFormat(new Date());
    console.log(now);
    if (this.currentDateFormat(result) < now) {
      this.sname = this.currentDateFormat(result);
      this.startValue = result;
    } else {
      this._toast.info('开始时间不得大于当前时间！');
    }
  }
  onEOk(result: Date) {
    if (0 === this.sname.localeCompare('选择')) {
      this._toast.info('请先选择开始时间');
      return;
    }

    const now = this.currentDateFormat(new Date());
    if ((this.currentDateFormat(result) < now) && this.currentDateFormat(result) > this.sname) {
      this.ename = this.currentDateFormat(result);
      this.endValue = result;
    } else {
      this._toast.info('结束时间不得大于当前时间但要大于开始时间！');
    }
  }


  formatIt(date: Date, form: string) {
    const pad = (n: number) => (n < 10 ? `0${n}` : n);
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    if (form === 'YYYY-MM-DD') {
      return dateStr;
    }
    if (form === 'HH:mm') {
      return timeStr;
    }
    return `${dateStr} ${timeStr}`;
  }

  renderHeader() {
    return '选择新闻类型';
  }

  renderHeader2() {
    return 'dd';
  }

  onChange = event => {
    console.log('ngmodel value: ', JSON.stringify(this.selectedStatus1));
    console.log('output radio status: ', JSON.stringify(event));
    this.newsType = event.value;
    console.log(this.newsType);

  }

  onChange2 = event => {
    console.log('ngmodel value: ', JSON.stringify(this.selectedStatus2));
    console.log('output radio status:  ', JSON.stringify(event));
    this.newsType = 0;
    console.log(this.newsType);

  }

  onChange3 = e => {
    this.disabled = false;
    console.log('agree submit', e);
  }
}
