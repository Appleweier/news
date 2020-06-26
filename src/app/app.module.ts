import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { CarouselComponentComponent } from './carousel-component/carousel-component.component';
import { NoticeBarComponent } from './notice-bar/notice-bar.component';
import { ToobarComponent } from './toobar/toobar.component';
import { PersonalCenterComponent } from './personal-center/personal-center.component';
import { RegisterComponent } from './register/register.component';
import { MeetTroubleComponent } from './meet-trouble/meet-trouble.component';
import { NewsPullToRefreshBasicComponent } from './news-pull-to-refresh-basic/news-pull-to-refresh-basic.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    PageNotFoundComponent,
    NavBarComponent,
    LoginComponent,
    CarouselComponentComponent,
    NoticeBarComponent,
    ToobarComponent,
    PersonalCenterComponent,
    RegisterComponent,
    MeetTroubleComponent,
    NewsPullToRefreshBasicComponent
  ],
  imports: [
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgZorroAntdMobileModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
