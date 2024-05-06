import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HTTP_INTERCEPTORS,HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './services/interceptor/auth.interceptor';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[HttpClient,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}]
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
