import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectunitPage } from './selectunit.page';

describe('SelectunitPage', () => {
  let component: SelectunitPage;
  let fixture: ComponentFixture<SelectunitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectunitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectunitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
