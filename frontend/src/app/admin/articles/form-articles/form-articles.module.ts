import { NgModule } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { FormArticlesComponent } from './form-articles.component';
import { EditorModule } from '../../../pages/editor/editor.module';


const routes: Routes = [
  {
    path: '',
    component: FormArticlesComponent,
  },
];

@NgModule({
  declarations: [FormArticlesComponent],
  imports: [
    CommonModule,
    RouterLink,
    NgOptimizedImage,
    
    RouterModule.forChild(routes),
   EditorModule
  ],
  exports: [],
  providers: [],
})


export class FormArticlesModule { }
