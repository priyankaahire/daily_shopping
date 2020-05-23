import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DealOfDayPage } from './deal-of-day';

describe('DealOfDayPage', () => {
  let component: DealOfDayPage;
  let fixture: ComponentFixture<DealOfDayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealOfDayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DealOfDayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
