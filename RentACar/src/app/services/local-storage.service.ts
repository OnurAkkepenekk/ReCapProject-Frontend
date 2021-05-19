import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setLocalStorage(token: string, data: string) {
    localStorage.setItem(token, data);
  }
  deleteLocalStorage(token: string) {
    localStorage.removeItem(token);
  }

  getLocalStorage(token: string) {
    if (localStorage.getItem(token)) {
      return localStorage.getItem(token);
    } else {
      return false;
    }
  }
}
