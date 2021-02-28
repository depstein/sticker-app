import { Component, OnInit, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalDataService } from "./../global-data.service";

@Component({
  selector: 'app-select-data-modal',
  templateUrl: './select-data-modal.page.html',
  styleUrls: ['./select-data-modal.page.scss'],
})
export class SelectDataModalPage implements OnInit {
  totalNutrients: any;
  dataValue: number;
  @Input() selectedUnit: string;

  constructor(
    public viewCtrl: ModalController,
    public global: GlobalDataService)
    {
    this.totalNutrients = {
      "calories": 0,
      "g fiber": 0,
      "g carbohydrate": 0,
      "g sodium": 0,
      "g sugar": 0
    };
    this.dataValue = 0;
  }

  ngOnInit() {
  }

  dismiss() {
    this.viewCtrl.dismiss({
      sum: this.global.stickerInfo.domain == 'calories' ? this.totalNutrients : this.dataValue
    });
  }

  onTotalNutrientsChanged(totalNutrients: any) {
    this.totalNutrients = totalNutrients;
  }

  onDataValueChanged(dataValue: number) {
    this.dataValue = dataValue;
  }

}
