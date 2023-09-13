/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameGateway } from 'game.gateway';
import { MongooseModule } from '@nestjs/mongoose';

import { PlayerService } from './player.service';
import { PlayerModule } from './player.module';
import { MongodbService } from './mongodb/mongodb.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/SuperPenguin'),
    PlayerModule,
  ],
  controllers: [AppController],
  providers: [AppService, GameGateway, PlayerService, MongodbService],
})
export class AppModule { }