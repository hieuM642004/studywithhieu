import { AfterViewInit, Component,ElementRef,ViewChild } from '@angular/core';

import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';
import { SearchService } from '../services/search.service';
import { SearchComponent } from '../components/search/search.component';
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ReactCompo from '../admin/index.admin';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit{
  @ViewChild('ReactCompo') ReactCompo!: ElementRef
  ngAfterViewInit(): void {
    ReactDOM.render(React.createElement(ReactCompo),this.ReactCompo.nativeElement)
  }
}
