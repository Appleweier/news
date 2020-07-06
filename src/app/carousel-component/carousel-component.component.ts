import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, query, animate, group } from '@angular/animations';
import { CommentStmt } from '@angular/compiler';
import { UserService } from '../user.service';
import axios from 'axios';

@Component({
  selector: 'app-carousel-component',
  templateUrl: './carousel-component.component.html',
  styleUrls: ['./carousel-component.component.css'],
  //   animations: [
  //     trigger('carousel', [
  //       transition(':increment', [
  //         group([
  //           query(':enter', [
  //             style({ transform: 'translateX(-100%)' }),
  //             animate('1s')
  //           ]),
  //           query(':leave', [
  //             animate('1s', style({ transform: 'translateX(100%)' }))
  //           ])
  //         ])
  //       ]),
  //       transition(':decrement', [
  //         group([
  //           query(':enter', [
  //             style({ transform: 'translateX(100%)' }),
  //             animate('1s')
  //           ]),
  //           query(':leave', [
  //             animate('1s', style({ transform: 'translateX(-100%)' }))
  //           ])
  //         ])
  //       ]),
  //     ])
  //   ]
})
export class CarouselComponentComponent implements OnInit {

  img1 = '../../assets/1.jpg';
  img2 = '../../assets/2.jpg';
  img3 = '../../assets/3.jpg';
  temp: string;
  id1: number;
  id2: number;
  id3: number;
  nowId: number;

  idIndex = [];
  imgIndex = [];

  constructor(private userService: UserService) { }



  ngOnInit(): void {


    // axios.post(`${this.userService.user.url}/getRotation`)
    // .then(res => {
    //   console.log(res);
    //   this.id1 = res.data.id1;
    //   this.id1 = res.data.id1;
    //   this.id1 = res.data.id1;
    //   this.idIndex.push(this.id1);
    //   this.idIndex.push(this.id2);
    //   this.idIndex.push(this.id3);
    //   this.imgIndex.push(res.data.img1);
    //   this.imgIndex.push(res.data.img2);
    //   this.imgIndex.push(res.data.img3);



    // })
    // .catch(err => {
    //   console.error(err);
    // });
    setInterval(e => {
      const num: any = this.img2.charAt(13);
      let n = Number(num);
      n = (n + 1) % 4;
      if (n === 0) {
        n++;
      }
      this.img2 =  `../../assets/${n}.jpg`;
      // console.log(num);

    }, 3000);

  }

}
