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
import { HashtagComponent } from '../../components/hashtag/hashtag.component';
import { TruncatePipe } from '../../pipes/truncate-name.pipe';
import { BtnEditComponent } from '../_components/btn-edit/btn-edit.component';
import { BtnDeleteComponent } from '../_components/btn-delete/btn-delete.component';
import { BtnAddComponent } from '../_components/btn-add/btn-add.component';
import { ToastComponent } from '../../components/toast/toast.component';


const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
  },
];

@NgModule({
  declarations: [ArticlesComponent,TruncatePipe ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterModule.forChild(routes),
    HttpClientModule,RouterModule,
    FavoriteComponent,
    UserComponent,
    HashtagComponent,
    BtnEditComponent,
    BtnDeleteComponent,
   BtnAddComponent,
   ToastComponent
  ],
  exports: [],
  providers: [DatePipe],
})


export class ArticlesModule { }
