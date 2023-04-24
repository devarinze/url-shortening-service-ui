import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShorturlListComponent } from './shorturl-list.component';

describe('ShorturlListComponent', () => {
  let component: ShorturlListComponent;
  let fixture: ComponentFixture<ShorturlListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShorturlListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShorturlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
