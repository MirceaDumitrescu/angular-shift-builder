import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  private localStorageUserData: any;
  private localStorageShiftData: any;

  public getLocalStorageUserData(user: string):UserData {
    this.localStorageUserData = JSON.parse(localStorage.getItem(user) || '{}');
    return this.localStorageUserData;
  }

  public setLocalStorageUserData(user: string, data: UserData):void {
    this.localStorageUserData = data;
    localStorage.setItem(user, JSON.stringify(data));
  }

  public getLocalStorageUserShifts():UserShift {
    return this.localStorageShiftData.shifts;
  }

  public setLocalStorageUserShifts(data: UserShift):void {
    this.localStorageShiftData.shifts.push(data);
    localStorage.setItem('userData', JSON.stringify(this.localStorageUserData));
  }


  constructor() { }
}
