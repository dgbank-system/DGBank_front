import { Injectable } from '@angular/core';
import * as pako from 'pako';
@Injectable({
  providedIn: 'root'
})
export class SharingService {
  private storageName: string = "Saved Ids";

  constructor() { }


  setStorage(data: any): void {
    // Serialize the data to a JSON string before storing it
    const compressedDataString = this.compressData(data);
    localStorage.setItem(this.storageName, compressedDataString);
  }
  
  getStorage(): any {
    // Retrieve the serialized data from localStorage
    const compressedDataString = localStorage.getItem(this.storageName);

      if (compressedDataString) {
        return this.decompressData(compressedDataString);
      } else {
        return null;
      }
  }

  
  
  
  clearUserSettings() {
    localStorage.removeItem(this.storageName);
  }

  cleanAll() {
    localStorage.clear()
  }


  compressData(data: any): string {
    const dataString = JSON.stringify(data);
    const compressedData = pako.deflate(dataString);
    const compressedDataString = btoa(String.fromCharCode.apply(null, Array.from(compressedData)));
    return compressedDataString;
  }
  
  // Function to decompress Base64 string and return data
   decompressData(compressedDataString: string): any {
    const compressedDataUint8 = Uint8Array.from(atob(compressedDataString), c => c.charCodeAt(0));
    const decompressedDataString = pako.inflate(compressedDataUint8, { to: 'string' });
    return JSON.parse(decompressedDataString);
  }



}