import { Component, OnInit,  ElementRef, Renderer2  } from '@angular/core';

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

  constructor(private _element: ElementRef, private _renderer: Renderer2) {}

  change($event) {
    console.log($event, 'onChange');
  }

  submit(value) {
    console.log(value, 'onSubmit');
    console.log(value);
  }

  clear(value) {
    console.log(value, 'onClear');
  }

  focus() {
    console.log('onFocus');
  }

  blur() {
    console.log('onBlur');
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
