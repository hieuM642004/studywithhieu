import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';



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
    path: 'new-post',
    loadChildren: () =>
      import('./pages/editor/editor.module').then((m) => m.EditorModule),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
