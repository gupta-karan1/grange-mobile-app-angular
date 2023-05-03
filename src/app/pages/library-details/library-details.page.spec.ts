import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryDetailsPage } from './library-details.page';

describe('LibraryDetailsPage', () => {
  let component: LibraryDetailsPage;
  let fixture: ComponentFixture<LibraryDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LibraryDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
