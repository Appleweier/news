import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  id: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location

  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  goBack(): void {
    this.location.back();
  }

}
