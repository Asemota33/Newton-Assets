import { Component } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-assets-modal',
  imports: [FontAwesomeModule],
  templateUrl: './add-assets-modal.component.html',
  styleUrl: './add-assets-modal.component.scss'
})
export class AddAssetsModalComponent {

  constructor(library: FaIconLibrary, public activeModal: NgbActiveModal) { 
    library.addIcons(
      faTrashCan,
      faCirclePlus
    )
  }

  closeModal() {
    this.activeModal.close();
  }
}
