import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalUpdateModalPage } from './cal-update-modal.page';

describe('CalUpdateModalPage', () => {
  let component: CalUpdateModalPage;
  let fixture: ComponentFixture<CalUpdateModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CalUpdateModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
