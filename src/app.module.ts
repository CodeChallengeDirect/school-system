import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

config();

@Module({
  imports: [UsersModule, MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION_STRING), ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'swagger-static'),
    serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
