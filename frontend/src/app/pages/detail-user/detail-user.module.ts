import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { HttpClientModule } from '@angular/common/http';
import { DetailUserComponent } from './detail-user.component';
import { UserComponent } from '../../components/user/user.component';


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
    RouterModule,
    TabViewModule,
    UserComponent
  ],
  exports: [],
  providers: [],
})


export class DetailUserModule { }
