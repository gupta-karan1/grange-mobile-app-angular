import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalModalPage } from './cal-modal.page';

describe('CalModalPage', () => {
  let component: CalModalPage;
  let fixture: ComponentFixture<CalModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CalModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
