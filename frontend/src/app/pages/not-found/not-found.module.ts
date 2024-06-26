import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found.component';


const routes: Routes = [
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
//   declarations: [PopulerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,RouterModule
  ],
  exports: [],
  providers: [],
})


export class NotFoundModule { }
