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

import { NewsPullToRefreshBasicComponent } from './news-pull-to-refresh-basic/news-pull-to-refresh-basic.component';



const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'meetTrouble', component: MeetTroubleComponent },
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
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'personCenter', component: PersonalCenterComponent },
  { path: 'login/register', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
