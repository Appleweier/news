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
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { MyPipePipePipe } from './my-pipe-pipe.pipe';
import { SearchDetailComponent } from './search-detail/search-detail.component';
import { ProfessionalSearchComponent } from './professional-search/professional-search.component';
import { LikeHateComponent } from './like-hate/like-hate.component';
import { RemarkAreaComponent } from './remark-area/remark-area.component';

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
    NewsPullToRefreshBasicComponent,
    NewsDetailComponent,
    SearchBarComponent,
    ImagePickerComponent,
    MyPipePipePipe,
    SearchDetailComponent,
    ProfessionalSearchComponent,
    LikeHateComponent,
    RemarkAreaComponent
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
