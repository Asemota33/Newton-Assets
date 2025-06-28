import { Component } from '@angular/core';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAssetsModalComponent } from './add-assets-modal/add-assets-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [FontAwesomeModule]
})
export class AppComponent {
  constructor(library: FaIconLibrary, private modalService: NgbModal) {
    library.addIcons(
      faHandHoldingDollar
    )
  }

  openModal() {
    this.modalService.open(AddAssetsModalComponent);
  }
}
