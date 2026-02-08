import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleMisionPage } from './detalle-mision.page';

describe('DetalleMisionPage', () => {
  let component: DetalleMisionPage;
  let fixture: ComponentFixture<DetalleMisionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMisionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
