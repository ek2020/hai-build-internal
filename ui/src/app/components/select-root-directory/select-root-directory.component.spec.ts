import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRootDirectoryComponent } from './select-root-directory.component';

describe('SelectRootDirectoryComponent', () => {
  let component: SelectRootDirectoryComponent;
  let fixture: ComponentFixture<SelectRootDirectoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectRootDirectoryComponent]
    });
    fixture = TestBed.createComponent(SelectRootDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
