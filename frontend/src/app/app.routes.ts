import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { RegisterComponent } from './auth/register/register.component';
import { DetailArticleComponent } from './pages/detail-article/detail-article.component';
import { DetailUserComponent } from './pages/detail-user/detail-user.component';
import { LoginComponent } from './auth/login/login.component';
import {AboutComponent} from './pages/about/about.component';
import {PopulerComponent} from './pages/populer/populer.component';



export const routes: Routes = [
  {
    title:'Home page',
    path: '',
    component: HomeComponent,
  },
  {
    path: 'articles',
    loadChildren: () =>
      import('./pages/articles/articles.module').then((m) => m.ArticlesModule),
  },
  {
    path: 'articles/:slug',
    loadChildren: () =>
      import('./pages/detail-article/detail-article.module').then((m) => m.DetailArticleModule),
  },
  {
    path: 'user/:slug',
    loadChildren: () =>
      import('./pages/detail-user/detail-user.module').then((m) => m.DetailUserModule),
  },
  {
    path: 'my-account/:slug',
    loadChildren: () =>
      import('./pages/detail-user/detail-user.module').then((m) => m.DetailUserModule),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'populer',
    component: PopulerComponent,
  },
  // A route to the about us page (module)
  // {
  //   path: 'about-us',
  //   loadChildren: () =>
  //     import('./modules/about-us/about-us.module').then((m) => m.AboutUsModule),
  // },
];
