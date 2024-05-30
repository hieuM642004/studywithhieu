import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AuthGuard } from './guards/auth.guard';
import { TopicsComponent } from './admin/topics/topics.component';
import { AdminGuard } from './guards/admin.guard';



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
    canActivate: [AuthGuard]
  },
  {
    path: 'my-account/:slug',
    loadChildren: () =>
      import('./pages/detail-user/detail-user.module').then((m) => m.DetailUserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'topics/:slug',
    loadChildren: () =>
      import('./pages/topics/topics.module').then((m) => m.TopicslModule),
    
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
      import('./pages/populer-detail-by-views/populerDetail.module').then((m) => m.PopulerDetailModule),
  },
  {
    path: 'populer-followers',
    loadChildren: () =>
      import('./pages/detail-populer-user/populerUser.module').then((m) => m.PopulerModule),
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then((m) => m.NotFoundModule),
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
  //Routes for admin
  {
    path: 'admin',
    component: TopicsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
