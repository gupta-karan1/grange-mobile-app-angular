import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateStudentPage } from './update-student.page';

describe('UpdateStudentPage', () => {
  let component: UpdateStudentPage;
  let fixture: ComponentFixture<UpdateStudentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
