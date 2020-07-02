import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import axios from 'axios';
import { HttpClient } from "@angular/common/http"
@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class SearchDetailComponent implements OnInit {

  content: any;
  title: any;
  newsType: any;
  sname: any;
  ename: any;
  info: string;
  result: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private http: HttpClient

  ) { }
  ngOnInit(): void {
    // this.info = this.route.snapshot.paramMap.get('info');
    console.log(localStorage.getItem('info'));
    this.info = localStorage.getItem('info');

    if (this.info === '' || this.info == null) {
      // console.log(this.info);
      this.sname = localStorage.getItem('st');
      this.ename = localStorage.getItem('et');
      this.newsType = localStorage.getItem('type');
      this.title = localStorage.getItem('title');

      this.content = localStorage.getItem('content');
      axios.post(`${this.userService.user.url}/professionalSearch`, {
        st: this.sname,
        et: this.ename,
        type: this.newsType,
        title: this.title,
        content: this.content
      })
        .then(res => {
          if (res.data.length == 0) {
            this.info = 'none';
          }
          this.result = res.data;
          console.log(res.data);
        })
        .catch(err => {
          console.error(err);
        });

    } else {



      axios.post(`${this.userService.user.url}/searchByTitle`, {
        title: this.info
      })
        .then(res => {
          if (res.data.length == 0) {
            this.info = 'none';
          }
          this.result = res.data;
          console.log(res.data);
          localStorage.removeItem('info');
        })
        .catch(err => {
          console.error(err);
        });


    }

  }

  onClick(id: number) {
    console.log(id);
    // this.router.navigateByUrl('personCenter');
  }
  renderHeader2() {
    // return 'Customized Right Side（Empty Content / Text / Image）';
  }

}
