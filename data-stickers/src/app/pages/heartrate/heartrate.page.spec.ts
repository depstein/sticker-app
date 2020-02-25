import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeartratePage } from './heartrate.page';

describe('HeartratePage', () => {
  let component: HeartratePage;
  let fixture: ComponentFixture<HeartratePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeartratePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeartratePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
