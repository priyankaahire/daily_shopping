import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Slider2Page } from './slider2';

describe('Slider2Page', () => {
  let component: Slider2Page;
  let fixture: ComponentFixture<Slider2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Slider2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Slider2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
