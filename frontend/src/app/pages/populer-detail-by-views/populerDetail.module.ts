import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PopulerDetailByViewsComponent } from './populer-detail-by-views.component';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from '../../components/user/user.component';


const routes: Routes = [
  {
    path: '',
    component: PopulerDetailByViewsComponent,
  },
];

@NgModule({
  declarations: [PopulerDetailByViewsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    UserComponent
  ],
  exports: [],
  providers: [],
})


export class PopulerDetailModule { }
