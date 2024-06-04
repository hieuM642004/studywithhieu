import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnEditComponent } from './btn-edit.component';

describe('BtnEditComponent', () => {
  let component: BtnEditComponent;
  let fixture: ComponentFixture<BtnEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
