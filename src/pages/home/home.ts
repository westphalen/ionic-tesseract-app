import { Component } from '@angular/core';
import { OcrProvider } from '../../providers/ocr'
import { AlertController, LoadingController } from 'ionic-angular'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(private ocrProvider: OcrProvider,
              private loadingController: LoadingController,
              private alertController: AlertController) {}

  public async recognize(img): Promise<void> {
    const loading = await this.loadingController.create({
      content: 'Analyzing image',
    });

    await loading.present();

    try {
      const value = await this.ocrProvider.text(img.srcElement, (progress) => {
        const percentage = Math.round(progress * 100)

        loading.setContent(`Analysing image (${percentage}%)`);
      });

      const alert = await this.alertController.create({
        title: 'OCR complete',
        inputs: [{
          type: 'textarea',
          value,
        }],
      });

      await alert.present();
    } finally {
      await loading.dismiss();
    }
  }
}
