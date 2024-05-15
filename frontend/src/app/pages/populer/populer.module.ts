import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PopulerComponent } from './populer.component';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  {
    path: '',
    component: PopulerComponent,
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


export class PopulerModule { }
