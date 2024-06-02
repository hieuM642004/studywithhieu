import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
 
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'articles',
        loadChildren: () =>
          import('./articles/articles.module').then(m => m.ArticlesModule),
      
      }
    ]
  },
  {
  
            path: 'articles/add-article',
            loadChildren: () =>
              import('./articles/form-articles/form-articles.module').then(m => m.FormArticlesModule)
          
    
  },
  {
  
            path: 'articles/:id',
            loadChildren: () =>
              import('./articles/form-articles/form-articles.module').then(m => m.FormArticlesModule)
          
    
  },
  {
  
            path: 'episodes',
            loadChildren: () =>
              import('./episodes/episodes.module').then(m => m.EpisodesModule)
          
    
  },
  {
  
            path: 'comments',
            loadChildren: () =>
              import('./comments/comments.module').then(m => m.CommentsModule)
          
    
  },
  {
  
            path: 'topics',
            loadChildren: () =>
              import('./topics/topics.module').then(m => m.TopicsModuleAdmin)
          
    
  },
];

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class AdminModule {}
