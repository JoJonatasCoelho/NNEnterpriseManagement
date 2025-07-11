import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnterpriseController } from './enterprise/enterprise.controller';
import { EnterpriseService } from './enterprise/enterprise.service';
import { ContactModule } from './contact/contact.module';
import { AddressModule } from './address/address.module';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enterprise } from './enterprise/entities/enterprise.entity';
import { Address } from './address/entities/address.entity';
import { Contact } from './contact/entities/contact.entity';
import { ContactService } from './contact/contact.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/users.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'postgres'),
        database: configService.get<string>('DB_DATABASE', 'fakedatabase'),
        entities: [Enterprise, Address, Contact, User],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Enterprise, Contact, Address]),
    EnterpriseModule,
    AddressModule,
    ContactModule,
    AuthModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '3000s' },
      }),
      global: true,
    }),
  ],
  controllers: [AppController, EnterpriseController],
  providers: [
    AppService,
    EnterpriseService,
    ContactService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [EnterpriseService, ContactService],
})
export class AppModule {}
