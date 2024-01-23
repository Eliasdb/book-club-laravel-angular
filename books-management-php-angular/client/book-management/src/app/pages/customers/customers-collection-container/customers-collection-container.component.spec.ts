import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersCollectionContainerComponent } from './customers-collection-container.component';

describe('CollectionContainerComponent', () => {
  let component: CollectionContainerComponent;
  let fixture: ComponentFixture<CollectionContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomersCollectionContainerComponent]
    });
    fixture = TestBed.createComponent(CustomersCollectionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
