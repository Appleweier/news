import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toobar',
  templateUrl: './toobar.component.html',
  styleUrls: ['./toobar.component.css']
})
export class ToobarComponent implements OnInit {

  newsIcon = '../../assets/icon/news.svg';
  newsActivedIcon = '../../assets/icon/news (1).svg';
  meIcon = '../../assets/icon/me.svg';
  meActivedIcon = '../../assets/icon/meActived.svg';

  isNews = '';
  isMe = '';

  constructor() { }

  clickMe(): void {
    this.isNews = this.newsIcon;
    this.isMe = this.meActivedIcon;
  }
  clickNews(): void {
    this.isNews = this.newsActivedIcon;
    this.isMe = this.meIcon;
  }

  ngOnInit(): void {
    this.isNews = this.newsActivedIcon;
    this.isMe = this.meIcon;
  }

}
