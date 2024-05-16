import { Component, HostListener, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ArticlesService } from '../../services/articles.service';
import { EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PaginatedArticles } from '../../types/types';
import { Articles } from '../../types/types';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() searchInput: EventEmitter<string> = new EventEmitter<string>();
  private searchTerms: Subject<string> = new Subject<string>();
  dataFromSearch: Articles[] = [];
  showSuggestions: boolean = false;
  constructor(
    private articleService: ArticlesService,
    private eRef: ElementRef
  ) {
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchQuery: string) =>
          this.articleService.getArticles(1, 10, searchQuery)
        )
      )
      .subscribe(
        (articlesData: PaginatedArticles) => {
          this.dataFromSearch = articlesData.data.data;
          this.showSuggestions = true;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  onInputChange(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchTerms.next(searchQuery);
  }

  selectSuggestion(): void {
    this.showSuggestions = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showSuggestions = false;
    }
  }
}
