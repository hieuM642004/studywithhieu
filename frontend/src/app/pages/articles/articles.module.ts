import { NgModule } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles.component';
import { HttpClientModule } from '@angular/common/http';
import { FavoriteComponent } from '../../components/favorite/favorite.component';
import { CommentService } from '../../services/socket/comments.service';
import { DateFormatPipe } from '../../pipes/time.pipe';
import { UserComponent } from '../../components/user/user.component';


const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
  },
];

@NgModule({
  declarations: [ArticlesComponent, DateFormatPipe],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterModule.forChild(routes),
    HttpClientModule,RouterModule,
    FavoriteComponent,
    UserComponent
   
  ],
  exports: [],
  providers: [DatePipe],
})


export class ArticlesModule { }
