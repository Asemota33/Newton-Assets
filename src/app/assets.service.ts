import { Injectable } from '@angular/core';
import { Asset } from './asset.interface'; 

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  assets: Asset[] = [];

  constructor() { }

  addAsset(asset: Asset[]) {
    this.assets.push(...asset);
  }

  deleteAsset(index: number) {
    if (index >= 0 && index < this.assets.length) {
      this.assets.splice(index, 1);
    } else {
      console.error('Index out of bounds');
    }
  }

  getAssets() {
    return this.assets;
  }
}
