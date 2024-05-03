import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-user',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.scss'
})
export class ProfileUserComponent  {

}
