import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DetailUserComponent } from './detail-user.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms'; 

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
    HttpClientModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule 
  ],
  exports: [],
  providers: [],
})

export class DetailUserModule { }
