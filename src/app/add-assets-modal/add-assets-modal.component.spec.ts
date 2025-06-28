import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetsModalComponent } from './add-assets-modal.component';

describe('AddAssetsModalComponent', () => {
  let component: AddAssetsModalComponent;
  let fixture: ComponentFixture<AddAssetsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAssetsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAssetsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
