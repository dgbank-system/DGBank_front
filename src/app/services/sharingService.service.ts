import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  private storageName: string = "Saved Ids";

  constructor() { }


  setStorage(data: any): void {
    localStorage.setItem(this.storageName, data);
  }
  
  getStorage(): any {
    const res = localStorage.getItem(this.storageName);
    return res;
  }

  
  
  
  clearUserSettings() {
    localStorage.removeItem(this.storageName);
  }

  cleanAll() {
    localStorage.clear()
  }





}