import { Module, RequestMethod } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { LoggerModule } from 'nestjs-pino';
import { TerminusModule } from '@nestjs/terminus';
import { InfrastructureModule } from './infraestructure/infrastructure.module';
import { ConfigModule } from '@nestjs/config';

const optionsPinoPretty = {
  target: 'pino-pretty',
  options: {
    singleLine: true,
    translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l Z",
    colorize: true,
    ignore: 'context,pid,hostname',
    messageFormat: "{context} - {msg}"
  },
  level: 'info'
}

const optionsPinoElastic = {
  target: 'pino-elasticsearch',
  options: {
    index: `${process.env.npm_package_name}`,
    node: `${process.env.ELASTIC_URL}`,
    auth: {
      username: `${process.env.ELASTIC_USER}`,
      password: `${process.env.ELASTIC_PASS}`
    },
    'es-version': 8,
    'flush-bytes': 1000
  },
  level: 'info'
}

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        name: `${process.env.npm_package_name}:${process.env.npm_package_version}`,
        genReqId: req => uuidv4(),
        quietReqLogger: true,
        customReceivedMessage: (req, res) => `REQUEST_RECEIVED - [${req.method}] ${req['originalUrl']}`,
        customSuccessMessage: (req, res) => `REQUEST_PROCESSED - [${req.method}] ${req['originalUrl']}`,
        customErrorMessage: (req, res) => `REQUEST_FAILED - [${req.method}] ${req['originalUrl']}`,
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport: process.env.NODE_ENV !== 'production' ? optionsPinoPretty : {
          targets: [ optionsPinoElastic, optionsPinoPretty ]
        },
        customReceivedObject(req, res, val?) {
          return {
            method: req.method,
            url: req.url,
            headers: req.headers,
            body: req['body'],
            query: req['query'],
            params: req['params'],
            response: val
          }
        },
      },
      exclude: []
    }),
    InfrastructureModule,
    TerminusModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [],
})
export class AppModule {}