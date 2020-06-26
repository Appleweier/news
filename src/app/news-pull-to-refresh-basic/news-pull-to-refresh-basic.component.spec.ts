import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPullToRefreshBasicComponent } from './news-pull-to-refresh-basic.component';

describe('NewsPullToRefreshBasicComponent', () => {
  let component: NewsPullToRefreshBasicComponent;
  let fixture: ComponentFixture<NewsPullToRefreshBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsPullToRefreshBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsPullToRefreshBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
