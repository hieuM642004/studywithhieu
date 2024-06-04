import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EditorComponent } from './editor.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { AlertComponent } from '../../components/alert/alert.component';
import { ToastComponent } from '../../components/toast/toast.component';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
  },
];

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,RouterModule,
    RouterModule,
    CKEditorModule,
    LoadingComponent,
    AlertComponent,
   ToastComponent
  ],
  exports: [EditorComponent],
  providers: [],
})


export class EditorModule { 

}
