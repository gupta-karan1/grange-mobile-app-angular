import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiaryTaskModalPage } from './diary-task-modal.page';

describe('DiaryTaskModalPage', () => {
  let component: DiaryTaskModalPage;
  let fixture: ComponentFixture<DiaryTaskModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DiaryTaskModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
