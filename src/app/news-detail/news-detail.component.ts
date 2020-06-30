import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';

import axios from 'axios';
@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})

export class NewsDetailComponent implements OnInit {

  id: string;
  showHtml: any;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService

  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    axios.post(this.userService.user.url + '/getArticleById', {
      id: this.id
    })
    .then(res => {
      // console.log(res);
      this.showHtml = `${res.data.content}`;
    })
    .catch(err => {
      console.error(err);
    });

  }

  goBack(): void {
    this.location.back();
  }

}
