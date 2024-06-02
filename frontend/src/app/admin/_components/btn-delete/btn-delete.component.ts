
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-btn-delete',
  standalone: true,
  imports: [ConfirmDialogComponent],
  templateUrl: './btn-delete.component.html',
  styleUrls: ['./btn-delete.component.scss']
})
export class BtnDeleteComponent {
  @ViewChild(ConfirmDialogComponent) confirmDialog!: ConfirmDialogComponent;
  @Output() deleteConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  onDelete(event: Event) {
    this.confirmDialog.confirm2(event).then((confirmed: boolean) => {
      this.deleteConfirmed.emit(confirmed);
    });
  }
  
  
}
