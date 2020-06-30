import { Component, OnInit } from '@angular/core';
import { map, delay } from 'rxjs/operators';
import { NewsBrief } from '../newsBrief';
import axios from 'axios';
import { UserService } from '../user.service';
import { ToastService } from 'ng-zorro-antd-mobile';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-news-pull-to-refresh-basic',
  templateUrl: './news-pull-to-refresh-basic.component.html',
  styleUrls: ['./news-pull-to-refresh-basic.component.css']
})
export class NewsPullToRefreshBasicComponent implements OnInit {

  List: any;
  isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent);
  pageLimit = 20;
  public directionCount = 0;
  page = 0;
  state = {
    refreshState: {
      currentState: 'deactivate',
      drag: false
    },
    direction: '',
    endReachedRefresh: false,
    height: 500,
    data: [],
    directionName: 'both up and down'
  };
  dtPullToRefreshStyle = { height: this.state.height + 'px' };


  constructor(private userService: UserService, private _toast: ToastService, private sanitizer: DomSanitizer) { }

  onClick() {
    this.directionCount++;
    switch (this.directionCount) {
      case 0:
        this.state.direction = '';
        this.state.directionName = 'both up and down';
        break;
      case 1:
        this.state.direction = 'down';
        this.state.endReachedRefresh = true;
        this.state.directionName = 'down';
        break;
      case 2:
        this.state.direction = 'up';
        this.state.directionName = 'up';
        break;
      default:
        this.directionCount = 0;
        this.state.direction = '';
        this.state.directionName = 'both up and down';
        break;
    }
  }

  pullToRefresh(event) {
    if (this.state.data.length >= this.List.length) {
      this._toast.info('刷到头了😂');
      return;
    }
    this.getArticle();
    if (event === 'endReachedRefresh') {
      if (this.page < 9) {
        this.page++;
        this.addItems(this.page * this.pageLimit);
        this.state.refreshState.currentState = 'release';
        setTimeout(() => {
          this.state.refreshState.currentState = 'finish';
        }, 1000);
      }
    } else {
      if (event === 'down') {
        this.state.data = [];
        this.page = 0;
        this.addItems(0);
      } else {
        if (this.page < 9) {
          this.page++;
          this.addItems(this.page * this.pageLimit);
        }
      }
    }
  }

  addItems(startIndex) {
    for (let i = startIndex; i < this.pageLimit * (this.page + 1); i++) {
      // this.state.data.push(i);

      if (i >= 10) {
        if (i >= this.List.length) {
          this._toast.info('刷到头了😂');
          return;
        }
      }
      this.state.data.push(i);
    }
  }

  getArticle() {
    axios.get(this.userService.user.url + '/getarticle')
      .then(res => {
        this.List = res.data;
        console.log(this.List);
      })
      .catch(err => {
        console.error(err);
      });
  }

  ngOnInit() {
    this.getArticle();
    this.addItems(0);

  }

}
