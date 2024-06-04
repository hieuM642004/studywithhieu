import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesService } from '../../services/articles.service';
import { Articles, PaginatedArticles } from '../../types/types';
import { User } from '../../types/types';
import { UsersService } from '../../services/user.service';
import { BtnAddComponent } from '../_components/btn-add/btn-add.component';
import { AuthInterceptor } from '../../interceptor/auth.interceptor';
import { BtnEditComponent } from '../_components/btn-edit/btn-edit.component';
import { BtnDeleteComponent } from '../_components/btn-delete/btn-delete.component';
import { ToastComponent } from '../../components/toast/toast.component';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, BtnEditComponent, BtnDeleteComponent,BtnAddComponent],  
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']  
})
export class UsersComponent implements OnInit {
    @ViewChild(ToastComponent) toastComponent!: ToastComponent;
    data: Articles[] = [];
    users: User[] = [];
    constructor(private articlesService: ArticlesService, private usersService: UsersService) {}
    ngOnInit(): void {
        this.fetchUsers();
    }
    fetchUsers() {
        this.usersService.getUsers().subscribe((usersData) => {
            this.users = usersData.data;
            console.log(this.users);
        });
    }
    onDeleteConfirmed(confirmed: boolean,userId: string) {
        if (confirmed) {
            this.usersService.deleteUser(userId).subscribe(() => {
              this.toastComponent.showToast('Users deleted successfully', 'success');
              setTimeout(() => {
                this.fetchUsers();
              }, 1000);
            }, error => {
              this.toastComponent.showToast('Failed to delete article', 'error');
              console.error('Failed to delete article:', error);
            });
          } else {
            console.log('User rejected deletion.');
          }
    }
}
