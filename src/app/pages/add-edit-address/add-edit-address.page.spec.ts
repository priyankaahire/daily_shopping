import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddEditAddressPage } from './add-edit-address.page';

describe('AddEditAddressPage', () => {
  let component: AddEditAddressPage;
  let fixture: ComponentFixture<AddEditAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditAddressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
