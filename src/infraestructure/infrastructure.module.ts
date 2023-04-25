import { CacheModule, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Config } from './config';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      dialectOptions: { 
          dateStrings: true, 
          typeCast: true, 
          timezone: 'local' 
      }, 
      timezone: 'America/Caracas',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: false,
      synchronize: false,
      logging: false,
      define: {
        freezeTableName: true,
      },
      models: Config.getEntities().map(e => e.useValue),
    }),
    CacheModule.register(),
  ],
  controllers: Config.getControllers(),
  providers: [
    ...Config.getServices(),
    ...Config.getRepositories(),
    ...Config.getEntities(),
  ],
  exports: [],
})
export class InfrastructureModule { }
