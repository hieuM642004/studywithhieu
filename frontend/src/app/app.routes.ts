import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';




export const routes: Routes = [
  {
    path: '',
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
    path: 'new-post',
    loadChildren: () =>
      import('./pages/editor/editor.module').then((m) => m.EditorModule),
  },
  {
    path: 'my-account/:slug',
    loadChildren: () =>
      import('./pages/detail-user/detail-user.module').then((m) => m.DetailUserModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'populer',
    loadChildren: () =>
      import('./pages/populer/populer.module').then((m) => m.PopulerModule),
  },
  {
    path: 'populer-views',
    loadChildren: () =>
      import('./pages/populer-detail-by-views/populerDetail.module').then((m) => m.PopulerModule),
  },
  {
    path: 'populer-followers',
    loadChildren: () =>
      import('./pages/detail-populer-user/populerUser.module').then((m) => m.PopulerModule),
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
    path: 'auth/reset-password',
    component: ResetPasswordComponent,
  },
  
  // A route to the about us page (module)
  // {
  //   path: 'about-us',
  //   loadChildren: () =>
  //     import('./modules/about-us/about-us.module').then((m) => m.AboutUsModule),
  // },
];
