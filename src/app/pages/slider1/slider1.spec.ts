import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Slider1Page } from './slider1';

describe('Slider1Page', () => {
  let component: Slider1Page;
  let fixture: ComponentFixture<Slider1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Slider1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Slider1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
