import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiaryModalPage } from './diary-modal.page';

describe('DiaryModalPage', () => {
  let component: DiaryModalPage;
  let fixture: ComponentFixture<DiaryModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DiaryModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
