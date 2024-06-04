import { NgModule } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { HttpClientModule } from '@angular/common/http';
import { FavoriteComponent } from '../../components/favorite/favorite.component';
import { CommentService } from '../../services/socket/comments.service';
import { DateFormatPipe } from '../../pipes/time.pipe';
import { UserComponent } from '../../components/user/user.component';
import { HashtagComponent } from '../../components/hashtag/hashtag.component';
import { TruncatePipe } from '../../pipes/truncate-name.pipe';
import { BtnEditComponent } from '../_components/btn-edit/btn-edit.component';
import { BtnDeleteComponent } from '../_components/btn-delete/btn-delete.component';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterModule.forChild(routes),
    HttpClientModule,RouterModule,
    FavoriteComponent,
    UserComponent,
    HashtagComponent,
    BtnEditComponent,
    BtnDeleteComponent
   
  ],
  exports: [],
  providers: [DatePipe],
})


export class UsersModule { }
