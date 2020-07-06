import { Component, OnInit, Input } from '@angular/core';
import axios from 'axios';
import { UserService } from '../user.service';
import { delay } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { ToastService, ActionSheetService } from 'ng-zorro-antd-mobile';
import { en_US, ru_RU, zh_CN, sv_SE, da_DK } from 'ng-zorro-antd-mobile';
import { PickerService, PickerRef } from 'ng-zorro-antd-mobile';


@Component({
  selector: 'app-remark-area',
  templateUrl: './remark-area.component.html',
  styleUrls: ['./remark-area.component.css']
})
export class RemarkAreaComponent implements OnInit {
  @Input() id: number;
  @Input() content: any;
  locale = {
    prevText: 'Prev',
    nextText: 'Next'
  };

  dataList = [
    { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
    { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
    { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
    { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
    { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' }
  ].map(obj => ({
    icon: `<img src="https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png" style="width:36px"/>`,
    title: obj.title
  }));

  isLogin = this.as.isLoggedIn;

  tablePageList = [];  // 分页后前台显示数据
  pageNo = 1; // 当前页码
  preShow = false; // 上一页
  nextShow = true; // 下一页
  pageSize = 5; // 单页显示数
  totalCount = 0; // 总页数
  pageSizes = [5, 10, 15];
  curPage = 1; // 当前页

  canOK = false;
  values: '快来评论把！';

  singleArea = [5, 10, 15];

  name3 = '选择';
  value3 = [];

  value = [];





  remarks = [];
  url = this.userService.user.url;
  cp(e) {
    console.log(e);
  }
  onOk3(result) {
    this.name3 = this.getResult(result);
  }
  getResult(result) {
    this.value = [];
    let temp = '';
    result.forEach(item => {
      this.value.push(item.label || item);
      temp += item.label || item;
    });
    return this.value.map(v => v).join(',');
  }

  shareToWeibo(title, url, picurl) {
    const sharesinastring = `http://v.t.sina.com.cn/share/share.php?title=${title}&url=${url}&content=utf-8&sourceUrl=${url}&pic=${picurl}`;
    window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');

  }


  onClick() {
    console.log(this.values);
    axios.post(`${this.url}/addARemark`, {
      remarkContent: this.values,
      articleId: this.id,
      userId: this.userService.user.id
    })
      .then(res => {
        console.log(res);
        this.getRemark();
        this.toast.info('评论成功！');
        this.values = '快来评论把！';

      })
      .catch(err => {
        console.error(err);
      });
  }
  onLike(e) {
    e.like_num++;
    console.log(e.id + this.as.isLoggedIn);
    axios.post(`${this.url}/article/remark/like`, {
      id: e.id
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }
  onDislike(e) {
    e.dislike_num++;
    console.log(e.id);
    axios.post(`${this.url}/article/remark/dislike`, {
      id: e.id
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }
  getPageList() {
    if (this.remarks.length >= 1) {
      if (this.remarks.length % this.pageSize === 0) {
        this.pageNo = Math.floor(this.remarks.length / this.pageSize);
      } else {
        this.pageNo = Math.floor(this.remarks.length / this.pageSize) + 1;
      }
      if (this.pageNo < this.curPage) {
        this.curPage = this.curPage - 1;
      }
      if (this.pageNo === 1 || this.curPage === this.pageNo) {
        this.preShow = this.curPage !== 1;
        this.nextShow = false;
      } else {
        this.preShow = this.curPage !== 1;
        this.nextShow = true;
      }
    } else {
      this.remarks.length = 0;
      this.pageNo = 1;
      this.curPage = 1;
    }
    this.tablePageList = this.remarks.slice((this.curPage - 1) * this.pageSize, (this.curPage) * this.pageSize);

  }
  // 点击上一页方法
  showPrePage() {
    this.curPage--;
    if (this.curPage >= 1) {
      this.getPageList();
    } else {
      this.curPage = 1;
    }
  }
  // 点击下一页方法
  showNextPage() {
    this.curPage++;
    if (this.curPage <= this.pageNo) {
      this.getPageList();
    } else {
      this.curPage = this.pageNo;
    }
  }
  // 自定义跳页方法
  onChangePage(value) {
    if (value > this.pageNo) {
      confirm('超出最大页数');
    } else if (value <= 0) {
      this.curPage = 1;
      this.getPageList();
    } else {
      this.curPage = value;
      this.getPageList();
    }
  }
  // 改变每页显示方法
  onChangePageSize(value) {
    this.pageSize = value;
    this.curPage = 1;
    this.getPageList();
  }


  async getRemark() {
    const temp = await axios.post(`${this.userService.user.url}/article/remark`, {
      id: this.id
    })
      .then(res => {
        this.remarks = res.data;
        console.log(this.remarks);
        this.getPageList();

      })
      .catch(err => {
        console.error(err);
      });
  }

  showShareActionSheet = () => {
    this._actionSheet.showShareActionSheetWithOptions(
      {
        options: this.dataList,
        message: '分享该文章把！',
        locale: zh_CN
      },
      buttonIndex => {
        return new Promise(resolve => {
          this.toast.info('回调 200ms');
          setTimeout(resolve, 200);
          this.shareToWeibo('Hello', 'DLMU News', 'https://zs.dlnu.edu.cn/images/logo.png');
        });
      }
    );
  }

  // tslint:disable-next-line: max-line-length
  constructor(private _picker: PickerService, private _actionSheet: ActionSheetService, private userService: UserService, private as: AuthService, private toast: ToastService) {

  }

  ngOnInit(): void {
    this.getRemark();
  }
}
