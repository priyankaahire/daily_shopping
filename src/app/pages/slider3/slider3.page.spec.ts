import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Slider3Page } from './slider3';

describe('Slider3Page', () => {
  let component: Slider3Page;
  let fixture: ComponentFixture<Slider3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Slider3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Slider3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
