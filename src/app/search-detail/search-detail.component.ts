import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
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

    axios.post(`${this.userService.user.url}/searchByTitle`, {
      title: this.info
    })
      .then(res => {
        if(res.data.length==0){
          this.info = 'none';
        }
        this.result = res.data;
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  onClick(id: number) {
    console.log(id);
    // this.router.navigateByUrl('personCenter');
  }
  renderHeader2() {
    // return 'Customized Right Side（Empty Content / Text / Image）';
  }

}
