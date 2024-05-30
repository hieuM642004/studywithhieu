import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { PopulerComponent } from './populer.component';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from '../../components/user/user.component';


const routes: Routes = [
  {
    path: '',
    component: PopulerComponent,
  },
];

@NgModule({
  declarations: [PopulerComponent],
  imports: [
    CommonModule,
    RouterLink,
    RouterModule.forChild(routes),
    HttpClientModule,
    UserComponent
  ],
  exports: [],
  providers: [],
})


export class PopulerModule { }
