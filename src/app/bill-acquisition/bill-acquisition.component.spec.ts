import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillAcquisitionComponent } from './bill-acquisition.component';

describe('BillAcquisitionComponent', () => {
  let component: BillAcquisitionComponent;
  let fixture: ComponentFixture<BillAcquisitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillAcquisitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillAcquisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
