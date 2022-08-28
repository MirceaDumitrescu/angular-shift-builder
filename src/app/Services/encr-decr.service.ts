import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class EncrDecrService {

  constructor() { }

  public encrypt(key: string, data: string): string {
    const cipher = CryptoJS.AES.encrypt(data, key);
    return cipher.toString();
  }

  public decrypt(key: string, data: string): string {
    const bytes = CryptoJS.AES.decrypt(data, key);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
  }


}
