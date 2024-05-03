import { Component,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../components/search/search.component';
import { ProfileUserComponent } from '../../components/profile-user/profile-user.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule,SearchComponent,ProfileUserComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit{
  isMenuOpen = false;
  constructor() {}

  ngOnInit(): void {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
