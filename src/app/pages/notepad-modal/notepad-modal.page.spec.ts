import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotepadModalPage } from './notepad-modal.page';

describe('NotepadModalPage', () => {
  let component: NotepadModalPage;
  let fixture: ComponentFixture<NotepadModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NotepadModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
