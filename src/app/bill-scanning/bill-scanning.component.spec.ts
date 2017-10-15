import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillScanningComponent } from './bill-scanning.component';

describe('BillScanningComponent', () => {
  let component: BillScanningComponent;
  let fixture: ComponentFixture<BillScanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillScanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillScanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
