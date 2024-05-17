import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
  },
];

@NgModule({
//   declarations: [AboutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,RouterModule
  ],
  exports: [],
  providers: [],
})


export class AboutModule { }
