import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',
})
export class FavoriteComponent implements OnInit {
  @Input() articleId: string | undefined;
  isFavorited: boolean = false;
  favoritesCount: number = 0;
  constructor(
    private readonly authService: AuthService,
    private readonly favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    if (this.articleId) {
      
      this.favoriteService.countFavoritesByArticleId(this.articleId).subscribe(
        (count) => {
          this.favoritesCount = count.data;
        },
        (error) => {
          console.error('Error counting favorites:', error);
        }
      );

      
      const idUser = this.authService.getAccessTokenPayload().id;
      this.favoriteService.getFavorites().subscribe(
        (response) => {
          const userFavorites = response.data.find(
            (favorite: any) => favorite.idUser === idUser
          );
          if (userFavorites) {
            this.isFavorited = userFavorites.idArticle.includes(this.articleId);
          } else {
            this.isFavorited = false;
          }
        },
        (error) => {
          console.error('Error checking favorite:', error);
        }
      );
    } else {
      console.error('Article ID is undefined');
    }
  }

  handleFavoriteClick() {
    if (this.articleId) {
      const idUser = this.authService.getAccessTokenPayload().id;
      const data = {
        idUser: idUser,
        idArticle: [this.articleId],
      };

      if (this.isFavorited) {
        this.favoriteService.editFavorite(data).subscribe(
          (response) => {
            console.log(response);
            this.isFavorited = false;
          },
          (error) => {
            console.error('Error removing favorite:', error);
          }
        );
      } else {
        this.favoriteService.addFavorite(data).subscribe(
          (response) => {
            console.log(response);
            this.isFavorited = true;
          },
          (error) => {
            console.error('Error adding favorite:', error);
          }
        );
      }
    } else {
      console.error('Article ID is undefined');
    }
  }
}
