import { Injectable } from '@angular/core';
import { deflate, inflate } from 'pako';
@Injectable({
  providedIn: 'root'
})
export class SharingService {
  private storageName: string = "Settings";

  constructor() { }

  setSettings(data: any): void {
    // Serialize the data to a JSON string before compressing
    const serializedData = JSON.stringify(data);
    const serializedArrayUint8 = new TextEncoder().encode(serializedData);

    // Compress the serialized data
    const compressedData = deflate(serializedArrayUint8);
    const compressedDataArray = Array.from(compressedData);
    const compressedDataString = btoa(String.fromCharCode.apply(null, compressedDataArray));

    // Store the compressed data in localStorage
    localStorage.setItem(this.storageName, compressedDataString);
  }
  
  getUserSettings(): any | null {
    // Retrieve the compressed data string from localStorage
    const compressedDataString = localStorage.getItem(this.storageName);
  
    if (compressedDataString) {
      // Convert the Base64-encoded string back to an array of numbers
      const compressedDataArray = atob(compressedDataString).split('').map(char => char.charCodeAt(0));
  
      // Convert the array of numbers to a Uint8Array
      const compressedDataUint8 = new Uint8Array(compressedDataArray);
  
      // Decompress the compressed data
      const decompressedDataUint8 = inflate(compressedDataUint8);
  
      // Convert the decompressed data to a string
      const decompressedDataString = new TextDecoder().decode(decompressedDataUint8);
  
      // Deserialize the JSON string back to its original form
      return JSON.parse(decompressedDataString);
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


}