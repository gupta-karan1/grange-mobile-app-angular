import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchStudentsPage } from './search-students.page';

describe('SearchStudentsPage', () => {
  let component: SearchStudentsPage;
  let fixture: ComponentFixture<SearchStudentsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SearchStudentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
