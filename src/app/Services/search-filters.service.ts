import { Component, Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, debounceTime, shareReplay, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchFiltersService {

  public searchWordChange = new BehaviorSubject<string>('');

  public setWord(word: string): void {
    this.searchWordChange.next(word);
  }
  public getWord():string {
    return this.searchWordChange.value;
  }

}
