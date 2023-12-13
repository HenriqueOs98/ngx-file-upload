import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XlsxUploadComponent } from './xlsx-upload.component';

describe('FileUploadComponent', () => {
  let component: XlsxUploadComponent;
  let fixture: ComponentFixture<XlsxUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XlsxUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XlsxUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
