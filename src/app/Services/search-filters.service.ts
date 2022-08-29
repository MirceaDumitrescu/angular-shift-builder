import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap, debounceTime, shareReplay, delay } from 'rxjs/operators';

interface DateInterval {
  from: any;
  to: any;
}
@Injectable({
  providedIn: 'root'
})
export class SearchFiltersService {

  public searchWordChange = new BehaviorSubject<string>('');
  public searchDateInterval = new BehaviorSubject<DateInterval>({
    from: null,
    to: null
  });

  public setWord(word: string): void {
    this.searchWordChange.next(word);
  }
  public getWord():string {
    return this.searchWordChange.value;
  }

  public setDateInterval(dateInterval: DateInterval): void {
    this.searchDateInterval.next(dateInterval);
  }

  public getDateInterval():object {
    return this.getDateInterval;
  }

}
