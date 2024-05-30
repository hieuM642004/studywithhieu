import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hashtag',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './hashtag.component.html',
  styleUrl: './hashtag.component.scss'
})
export class HashtagComponent {
@Input() hashtag: any=''
}
