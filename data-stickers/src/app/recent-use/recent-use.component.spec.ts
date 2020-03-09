import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecentUseComponent } from './recent-use.component';

describe('RecentUseComponent', () => {
  let component: RecentUseComponent;
  let fixture: ComponentFixture<RecentUseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentUseComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecentUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
