import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable,of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private keyword = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  setSearchKeyword(value: string): void {
    this.keyword.next(value);
  }

  getSearchResults(): Observable<any> {
    return this.keyword.asObservable().pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((keyword: string) => {
        if (!keyword.trim()) {
          // if not search term, return empty array.
          return of([]);
        }
        return this.http.get<any>(`https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`);
      })
    );
  }
}