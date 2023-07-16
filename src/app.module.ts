import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { Config } from './data-source';

@Module({
  imports: [TypeOrmModule.forRoot(Config), CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
