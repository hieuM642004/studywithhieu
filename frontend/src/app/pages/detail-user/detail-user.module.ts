import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { DetailUserComponent } from './detail-user.component';


const routes: Routes = [
  {
    path: '',
    component: DetailUserComponent,
  },
];

@NgModule({
  declarations: [DetailUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,RouterModule,
    RouterModule
  ],
  exports: [],
  providers: [],
})


export class DetailUserModule { }
