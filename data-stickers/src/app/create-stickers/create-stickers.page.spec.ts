import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateStickersPage } from './create-stickers.page';

describe('CreateStickersPage', () => {
  let component: CreateStickersPage;
  let fixture: ComponentFixture<CreateStickersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStickersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateStickersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
