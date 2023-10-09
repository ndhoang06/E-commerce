import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { connectDB } from '../utils/config';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from 'src/users/users.module';
import { CommandModule } from 'nestjs-command';
import { CartModule } from 'src/cart/cart.module';
import { OrderModule } from '../orders/order.module';
// import { SeedsModule } from '../seeds/seeds.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CategoriesModule } from 'src/categories/categories.module';
import { PublicModule } from 'src/public/public.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: connectDB,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          entities: [__dirname + '/**/*.entity.ts'],
          migrations: [__dirname + '/migrations/*.ts'],
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
    CommandModule,
    ProductsModule,
    UsersModule,
    CartModule,
    OrderModule,
    AuthModule,
    CategoriesModule,
    PublicModule
    // SeedsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
