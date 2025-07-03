import { Component } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AssetsService } from '../assets.service';
import { Asset } from '../asset.interface';

@Component({
  selector: 'app-add-assets-modal',
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './add-assets-modal.component.html',
  styleUrl: './add-assets-modal.component.scss'
})
export class AddAssetsModalComponent {
  assets: Asset[] = [{id: 1, type: '', value: null}];
  deleteBtnDisabled = true;
  
  constructor(library: FaIconLibrary, public activeModal: NgbActiveModal, private assetsService: AssetsService) { 
    library.addIcons(
      faTrashCan,
      faCirclePlus
    )
  }

  addAsset() {
    this.deleteBtnDisabled = false;
    this.assets.push({id: this.assets.length + 1, type: '', value: null});
  }

  deleteAsset(index: number) {
    if (this.assets.length > 1) {
      this.assets.splice(index, 1);
      if (this.assets.length === 1) {
        this.deleteBtnDisabled = true; 
      }
    }
  }

  submitAssets() {
    this.assetsService.addAsset(this.assets)
    this.activeModal.close(this.assetsService.getAssets());

  }

  closeModal() {
    this.activeModal.close();
  }
}
