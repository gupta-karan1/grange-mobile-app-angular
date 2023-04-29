import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListLoginPage } from './list-login.page';

describe('ListLoginPage', () => {
  let component: ListLoginPage;
  let fixture: ComponentFixture<ListLoginPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
