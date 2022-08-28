import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  private localStorageUserData: UserData;
  private localStorageShiftData: UserShift;

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

  public setLocalStorageUserShifts(user: string, data: UserShift):void {
    this.localStorageShiftData = data;
    localStorage.setItem(user, JSON.stringify(data));
  }


  constructor() { }
}
