import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeartbeatStickerPage } from './heartbeat-sticker.page';

describe('HeartbeatStickerPage', () => {
  let component: HeartbeatStickerPage;
  let fixture: ComponentFixture<HeartbeatStickerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeartbeatStickerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeartbeatStickerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
