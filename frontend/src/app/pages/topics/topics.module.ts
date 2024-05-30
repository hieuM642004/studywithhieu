import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from '../../components/user/user.component';
import { TopicsComponent } from './topics.component';
import { FavoriteComponent } from '../../components/favorite/favorite.component';
import { CommentsComponent } from '../../components/comments/comments.component';
import { HashtagComponent } from '../../components/hashtag/hashtag.component';


const routes: Routes = [
  {
    path: '',
    component: TopicsComponent,
  },
];

@NgModule({
  declarations: [TopicsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    UserComponent,
    CommentsComponent,
    FavoriteComponent,
    HashtagComponent
  ],
  exports: [],
  providers: [],
})


export class TopicslModule { }
