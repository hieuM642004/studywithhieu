import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-btn-edit',
  standalone: true,
  imports:[CommonModule,RouterModule],
  templateUrl: './btn-edit.component.html',
  styleUrls: ['./btn-edit.component.scss']
})
export class BtnEditComponent {
  @Input() targetRoute: string = '/';
  @Input() articleId: string = '';
}
