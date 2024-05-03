import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticlesComponent } from './articles/articles.component';
import { RegisterComponent } from './auth/register/register.component';
import { DetailArticleComponent } from './components/detail-article/detail-article.component';
import { DetailUserComponent } from './components/detail-user/detail-user.component';



export const routes: Routes = [
  // A route to the home page (component)
  {
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
    path: 'login',
    component: RegisterComponent,
  },
  // A route to the about us page (module)
  {
    path: 'about-us',
    loadChildren: () =>
      import('./modules/about-us/about-us.module').then((m) => m.AboutUsModule),
  },
];
