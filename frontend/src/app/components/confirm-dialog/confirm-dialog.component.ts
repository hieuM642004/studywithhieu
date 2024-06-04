// confirm-dialog.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, ConfirmDialogModule, ToastModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ConfirmDialogComponent {

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

  // confirm1(event: Event) {
  //   this.confirmationService.confirm({
  //     target: event.target as EventTarget,
  //     message: 'Are you sure you want to save?',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
  //     },
  //     reject: () => {
  //       this.messageService.add({severity:'warn', summary:'Rejected', detail:'You have rejected'});
  //     }
  //   });
  // }

  confirm2(event: Event): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to delete?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
          resolve(true); 
        },
        reject: () => {
          this.messageService.add({severity:'warn', summary:'Rejected', detail:'You have rejected'});
          resolve(false); 
        },
        acceptButtonStyleClass: 'custom-delete-button',
        rejectButtonStyleClass: 'custom-cancel-button',
      });
    });
  }
  
}
