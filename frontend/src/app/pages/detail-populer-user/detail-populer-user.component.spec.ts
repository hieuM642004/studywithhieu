import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPopulerUserComponent } from './detail-populer-user.component';

describe('DetailPopulerUserComponent', () => {
  let component: DetailPopulerUserComponent;
  let fixture: ComponentFixture<DetailPopulerUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPopulerUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailPopulerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
