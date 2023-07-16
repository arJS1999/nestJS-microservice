import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const paypal = require('paypal-rest-sdk');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  paypal.configure({
    'mode': 'sandbox',
    'client_id': 'AbpplLd_kjC2RmPzZ2tfKu4F2CDGEC7QMDv9P7XxtAeNsFw_pxNf-SlhVwDvrOvb8ulDkO_fo75a5GwB',
    'client_secret': 'EBFapsPyGD15mNf94ri_NOmSvehARXLdtkKDHONoWcrs1unV_JkHK0rkAenUZF6_Wim2hjWY4H9-WdT7'
  });
  await app.listen(5000);
}
bootstrap();
