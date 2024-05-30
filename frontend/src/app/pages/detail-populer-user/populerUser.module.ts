import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DetailPopulerUserComponent } from './detail-populer-user.component';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from '../../components/user/user.component';


const routes: Routes = [
  {
    path: '',
    component: DetailPopulerUserComponent,
  },
];

@NgModule({
  declarations: [DetailPopulerUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    UserComponent
  ],
  exports: [],
  providers: [],
})


export class PopulerModule { }
