import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSeusAnunciosListComponent } from './home-seus-anuncios-list.component';

describe('HomeSeusAnunciosListComponent', () => {
  let component: HomeSeusAnunciosListComponent;
  let fixture: ComponentFixture<HomeSeusAnunciosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSeusAnunciosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSeusAnunciosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
