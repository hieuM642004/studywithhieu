import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { RegisterComponent } from './auth/register/register.component';
import { DetailArticleComponent } from './components/detail-article/detail-article.component';
import { DetailUserComponent } from './components/detail-user/detail-user.component';
import { LoginComponent } from './auth/login/login.component';
import { QuizzesComponent } from './pages/quizzes/quizzes.component';
import {AboutComponent} from './pages/about/about.component';



export const routes: Routes = [
  // A route to the home page (component) 
  {
    title:'Home page',
    path: '',
    component: HomeComponent,
  },
  {
    path: 'articles',
    component: ArticlesComponent,
  },
  {
    path: 'articles/:slug',
    component: DetailArticleComponent,
  },
  {
    path: 'user/:slug',
    component: DetailUserComponent,
  },
  {
    path: 'my-account/:slug',
    component: DetailUserComponent,
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
    path: 'quizzes',
    component: QuizzesComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  // A route to the about us page (module)
  // {
  //   path: 'about-us',
  //   loadChildren: () =>
  //     import('./modules/about-us/about-us.module').then((m) => m.AboutUsModule),
  // },
];
