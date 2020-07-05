import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { PersonalCenterComponent } from './personal-center/personal-center.component';
import { RegisterComponent } from './register/register.component';
import { MeetTroubleComponent } from './meet-trouble/meet-trouble.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NewsPullToRefreshBasicComponent } from './news-pull-to-refresh-basic/news-pull-to-refresh-basic.component';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { ProfessionalSearchComponent } from './professional-search/professional-search.component';
import { SearchDetailComponent } from './search-detail/search-detail.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'ps', component: ProfessionalSearchComponent, canActivate: [AuthGuard] },
  { path: 'meetTrouble', component: MeetTroubleComponent },
  { path: 'user/avatar', component: ImagePickerComponent, canActivate: [AuthGuard] },
  { path: 'search/detail', component: SearchDetailComponent },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      {
        path: 'news',
        component: NewsPullToRefreshBasicComponent
      },
      {
        path: '', redirectTo: 'news', pathMatch: 'full'
      }
    ]
  },
  { path: '', redirectTo: '/dashboard/news', pathMatch: 'full' },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'news/detail/:id', component: NewsDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'personCenter', component: PersonalCenterComponent, canActivate: [AuthGuard] },
  { path: 'login/register', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
