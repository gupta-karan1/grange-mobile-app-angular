import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotepadPage } from './notepad.page';

describe('NotepadPage', () => {
  let component: NotepadPage;
  let fixture: ComponentFixture<NotepadPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NotepadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
