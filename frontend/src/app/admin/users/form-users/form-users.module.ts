import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormUsersComponent } from './form-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from '../../../components/toast/toast.component';

const routes: Routes = [
  {
    path: '',
    component: FormUsersComponent,
  },
];

@NgModule({
  declarations: [FormUsersComponent], 
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
FormsModule,
ToastComponent
  ],
  exports: [],
  providers: [],
})
export class FormUsersModule { }
