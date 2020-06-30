import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  value = '来搜索你喜欢的新闻吧~😃';
  autoFocus = {
    focusValue: true
  };
  focusObj = {
    focusValue: false,
    date: new Date()
  };

  constructor(private _element: ElementRef, private _renderer: Renderer2, private router: Router, private userService: UserService) { }

  change($event) {
    // console.log($event, 'onChange');
  }

  submit(value) {
    // console.log(value, 'onSubmit');
    // console.log(value);
    localStorage.setItem('info', `${value}`);

    this.router.navigateByUrl('search/detail');
    // this.router.navigate(['search/detail'], {
    //   queryParams: { info: this.value }
    // });

  }

  clear(value) {
    // console.log(value, 'onClear');
  }

  focus() {
    // console.log('onFocus');
    // console.log(this.value);
  }

  blur() {
    // console.log('onBlur');
  }

  cancel() {
    console.log('onCancel');
  }

  handleClick() {
    this.focusObj = {
      focusValue: true,
      date: new Date()
    };
  }

  ngOnInit(): void {
  }

}
