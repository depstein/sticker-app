import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StickerRenderPage } from './sticker-render.page';

describe('StickerRenderPage', () => {
  let component: StickerRenderPage;
  let fixture: ComponentFixture<StickerRenderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StickerRenderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StickerRenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
