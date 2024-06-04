import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormUsersComponent } from './form-users.component';
import { ReactiveFormsModule } from '@angular/forms';

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
  ],
  exports: [],
  providers: [],
})
export class FormUsersModule { }
