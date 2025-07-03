import { Component, QueryList, ViewChildren } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbPopover, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AssetsService } from '../assets.service';
import { Asset } from '../asset.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-assets-modal',
  imports: [FontAwesomeModule, FormsModule, CommonModule, NgbPopoverModule],
  templateUrl: './add-assets-modal.component.html',
  styleUrl: './add-assets-modal.component.scss'
})
export class AddAssetsModalComponent {

  @ViewChildren('p') popoverRefs!: QueryList<NgbPopover>;
  @ViewChildren('p1') popoverRefs1!: QueryList<NgbPopover>;
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
          let inputField = invalidInput.tagName.startsWith('SELECT') ? 'type' : 'value';

          if (inputField === 'type') {
            const popoverDirective = this.popoverRefs.find((ref, idx) => idx === Number(invalidInput.getAttribute('data-index')));
            popoverDirective?.open();
            setTimeout(() => popoverDirective?.close(), 2000);
          }
          if (inputField === 'value') {
            const secondPopoverDirective = this.popoverRefs1.find((ref, idx) => idx === Number(invalidInput.getAttribute('data-index')));
            secondPopoverDirective?.open();
            setTimeout(() => secondPopoverDirective?.close(), 2000);
          }

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
