import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendToSnapchatComponent } from './send-to-snapchat.component';

describe('SendToSnapchatComponent', () => {
  let component: SendToSnapchatComponent;
  let fixture: ComponentFixture<SendToSnapchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendToSnapchatComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SendToSnapchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
