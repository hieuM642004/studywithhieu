import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArticlesComponent } from './form-articles.component';

describe('FormArticlesComponent', () => {
  let component: FormArticlesComponent;
  let fixture: ComponentFixture<FormArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormArticlesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
