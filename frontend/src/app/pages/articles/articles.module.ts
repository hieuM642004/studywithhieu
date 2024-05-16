import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles.component';
import { HttpClientModule } from '@angular/common/http';
import { FavoriteComponent } from '../../components/favorite/favorite.component';


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
    RouterModule.forChild(routes),
    HttpClientModule,RouterModule,
    FavoriteComponent
  ],
  exports: [],
  providers: [],
})


export class ArticlesModule { }
