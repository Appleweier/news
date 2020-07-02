import { Component, OnInit, Input } from '@angular/core';
import axios from 'axios';
import { UserService } from '../user.service';

@Component({
  selector: 'app-like-hate',
  templateUrl: './like-hate.component.html',
  styleUrls: ['./like-hate.component.css']
})
export class LikeHateComponent implements OnInit {
  @Input() id: number;
  like: number;
  dislike: number;

  isLiked: boolean;
  isHated: boolean;

  onLikeClick() {
    this.isLiked = !this.isLiked;
    this.isHated = !this.isHated;
    this.like++;
    axios.post(`${this.userService.user.url}/article/like`, {
      id: this.id
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });

  }
  onDisLikeClick() {
    this.dislike++;
    this.isLiked = !this.isLiked;
    this.isHated = !this.isHated;
    axios.post(`${this.userService.user.url}//article/hate`,{
      id: this.id
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.error(err);
    });



  }


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.id);
    axios.get(`${this.userService.user.url}/likeHate/${this.id}`)
      .then(res => {
        this.like = res.data.likes;
        this.dislike = res.data.hates;
      })
      .catch(err => {
        console.error(err);
      });
  }

}
