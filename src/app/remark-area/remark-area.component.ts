import { Component, OnInit, Input } from '@angular/core';
import axios from 'axios';
import { UserService } from '../user.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-remark-area',
  templateUrl: './remark-area.component.html',
  styleUrls: ['./remark-area.component.css']
})
export class RemarkAreaComponent implements OnInit {
  @Input() id: number;
  locale = {
    prevText: 'Prev',
    nextText: 'Next'
  };

  tablePageList = [];  // 分页后前台显示数据
  pageNo = 1; // 当前页码
  preShow = false; // 上一页
  nextShow = true; // 下一页
  pageSize = 5; // 单页显示数
  totalCount = 0; // 总页数
  pageSizes = [5, 10, 15];
  curPage = 1; // 当前页

  canOK = false;



  remarks = [];
  url = this.userService.user.url;
  cp(e) {
    console.log(e);
  }
  onLike(e) {
    e.like_num++;
    console.log(e.id);
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

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.getRemark();
  }
}
