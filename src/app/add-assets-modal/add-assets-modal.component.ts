import { Component } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AssetsService } from '../assets.service';
import { Asset } from '../asset.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-assets-modal',
  imports: [FontAwesomeModule, FormsModule, CommonModule ],
  templateUrl: './add-assets-modal.component.html',
  styleUrl: './add-assets-modal.component.scss'
})
export class AddAssetsModalComponent {

  assets: Asset[] = [{id: 1, type: '', value: null}];
  deleteBtnDisabled = true;
  firstInvalidField: string | null = null;

  
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
    setTimeout(() => {
      const forms = document.querySelectorAll('form');
      for (let i = 0; i < forms.length; i++) {
        const invalidInput = forms[i].querySelector('.is-invalid');
        if (invalidInput) {
          (invalidInput as HTMLElement).focus();
          break;
        }
        else {
          this.assetsService.addAsset(this.assets)
          this.activeModal.close(this.assetsService.getAssets());
        }
      }
    });

  }

  formatValue(asset: any) {
    if (asset.value !== null && asset.value !== undefined && asset.value !== '') {
      asset.value = parseFloat(asset.value).toFixed(2);
    }
  }
  
  closeModal() {
    this.activeModal.close();
  }
}
