import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { DetailArticleComponent } from './detail-article.component';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { PlaylistComponent } from '../../components/playlist/playlist.component';
import { DateFormatPipe } from '../../pipes/time.pipe';

const routes: Routes = [
  {
    path: '',
    component: DetailArticleComponent,
  },
];

@NgModule({
  declarations: [DetailArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    RouterModule,
    ButtonModule,
    ToggleButtonModule,
    FormsModule,
    PlaylistComponent,
  ],
  exports: [],
  providers: [],
})
export class DetailArticleModule {}
