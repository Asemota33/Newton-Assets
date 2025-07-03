import { Component } from '@angular/core';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAssetsModalComponent } from './add-assets-modal/add-assets-modal.component';
import { AssetsService } from './assets.service';
import { Asset } from './asset.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [FontAwesomeModule, CommonModule]
})
export class AppComponent {
  assetsList: Asset[] | null = [];
  constructor(library: FaIconLibrary, private modalService: NgbModal, private assetsService: AssetsService) {
    library.addIcons(
      faHandHoldingDollar,
    )
  }

  openModal() {
    let modalRef = this.modalService.open(AddAssetsModalComponent, { size: 'xl' });
    modalRef.result.then(
      (result) => {
        if(result?.length > 0) {
          this.assetsList = result;
        }
      }
    );
  }

  deleteAsset(index: number) {
    if (this.assetsList && this.assetsList.length > 0) {
      this.assetsService.deleteAsset(index);
      this.assetsList = this.assetsService.getAssets();
    }
  }

  get totalValue(): number | undefined {
    return this.assetsList?.reduce((acc, curr) => acc + (curr.value ?? 0), 0);
  }
}
