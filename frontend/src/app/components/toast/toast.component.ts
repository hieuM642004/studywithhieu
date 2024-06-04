import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button'; 

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, ToastModule, ButtonModule], 
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  providers: [MessageService]
})
export class ToastComponent {
  constructor(private messageService: MessageService) {}

  showToast(message: string, type: string) {
    this.messageService.add({severity: type, summary: message, life: 3000});
  }
}
