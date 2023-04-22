import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapFullPage } from './map-full.page';

describe('MapFullPage', () => {
  let component: MapFullPage;
  let fixture: ComponentFixture<MapFullPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MapFullPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
