import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, Routes } from '@angular/router';

import { TabViewModule } from 'primeng/tabview';
import { HttpClientModule } from '@angular/common/http';
import { DetailUserComponent } from './detail-user.component';
import { UserComponent } from '../../components/user/user.component';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from '../../components/toast/toast.component';

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
    RouterLink,
    HttpClientModule,
    RouterModule,
    TabViewModule,
    UserComponent,

    HttpClientModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastComponent,
  ],
  exports: [],
  providers: [],
})
export class DetailUserModule {}
