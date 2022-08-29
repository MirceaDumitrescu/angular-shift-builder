import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  private adminsArray: string[] = ['mirceagab@gmail.com'];

  private localStorageUserData: UserData;
  private localStorageShiftData: any = JSON.parse(localStorage.getItem('shifts') || '[]');
  private userIsAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userAuthData = new BehaviorSubject<string>('');
  loggedUser = this.userAuthData.asObservable();
  loggedUserIsAdmin = this.userIsAdmin.asObservable();


  public getLocalStorageUserData(user: string):UserData {
    this.localStorageUserData = JSON.parse(localStorage.getItem(user) || '{}');
    return this.localStorageUserData;
  }

  public setLocalStorageUserData(user: string, data: UserData):void {
    this.localStorageUserData = data;
    localStorage.setItem(user, JSON.stringify(data));
  }

  public getLocalStorageUserShifts():UserShift {
    return this.localStorageShiftData;
  }

  public setLocalStorageUserShifts(data: UserShift):void {
    this.localStorageShiftData = data;
    localStorage.setItem('shifts', JSON.stringify(data));
  }

  public setLoggedInUser(user: string):void {

    if (this.adminsArray.includes(user)) {
      this.userIsAdmin.next(true);
      localStorage.setItem('userIsAdmin', 'true');
    }


    this.userAuthData.next(user);
    localStorage.setItem('loggedInUser', user);
  }

  constructor() { }
}
