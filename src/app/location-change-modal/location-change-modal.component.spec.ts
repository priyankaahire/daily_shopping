import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocationChangeModalComponent } from './location-change-modal.component';

describe('LocationChangeModalComponent', () => {
  let component: LocationChangeModalComponent;
  let fixture: ComponentFixture<LocationChangeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationChangeModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationChangeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
