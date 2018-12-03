import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCreateEditComponent } from './users-create-edit.component';

describe('UsersCreateEditComponent', () => {
  let component: UsersCreateEditComponent;
  let fixture: ComponentFixture<UsersCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
