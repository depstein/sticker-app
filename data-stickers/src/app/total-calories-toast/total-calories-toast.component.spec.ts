import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TotalCaloriesToastComponent } from './total-calories-toast.component';

describe('TotalCaloriesToastComponent', () => {
  let component: TotalCaloriesToastComponent;
  let fixture: ComponentFixture<TotalCaloriesToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalCaloriesToastComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TotalCaloriesToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
