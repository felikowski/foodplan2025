import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { SeedService } from './seed/seed.service';
import {Repository} from "typeorm";
import {User} from "./users/entities/user.entity";

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: '../database/database.sqlite',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      UsersModule,
      TypeOrmModule.forFeature([User])
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}
