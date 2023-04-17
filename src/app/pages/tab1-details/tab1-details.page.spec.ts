import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tab1DetailsPage } from './tab1-details.page';

describe('Tab1DetailsPage', () => {
  let component: Tab1DetailsPage;
  let fixture: ComponentFixture<Tab1DetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Tab1DetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
