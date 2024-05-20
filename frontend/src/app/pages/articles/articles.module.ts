import { NgModule } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles.component';
import { HttpClientModule } from '@angular/common/http';
import { FavoriteComponent } from '../../components/favorite/favorite.component';
import { CommentService } from '../../services/socket/comments.service';


const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
  },
];

@NgModule({
  declarations: [ArticlesComponent],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterModule.forChild(routes),
    HttpClientModule,RouterModule,
    FavoriteComponent,
   
  ],
  exports: [],
  providers: [],
})


export class ArticlesModule { }
