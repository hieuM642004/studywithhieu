import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulerDetailByViewsComponent } from './populer-detail-by-views.component';
import {TruncatePipe} from '../../pipes/truncate.pipe';

describe('PopulerDetailByViewsComponent', () => {
  let component: PopulerDetailByViewsComponent;
  let fixture: ComponentFixture<PopulerDetailByViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopulerDetailByViewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopulerDetailByViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
