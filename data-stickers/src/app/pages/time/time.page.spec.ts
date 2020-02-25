import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimePage } from './time.page';

describe('TimePage', () => {
  let component: TimePage;
  let fixture: ComponentFixture<TimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
