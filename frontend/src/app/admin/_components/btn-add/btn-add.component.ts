import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-btn-add',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './btn-add.component.html',
  styleUrl: './btn-add.component.scss'
})
export class BtnAddComponent {
  @Input() targetRoute: string = '/';
}
