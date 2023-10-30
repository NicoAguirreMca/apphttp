import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { HttpCustomService } from './http/http.service';
import { ConfigModule } from '../core/config/config.module';
import { ConfigService } from '../core/config/config.service';


@Global()
@Module({
  imports:[HttpModule,ConfigModule],
  providers: [HttpCustomService],
  exports: [HttpModule, HttpCustomService]
})
export class ProvidersModule {
  constructor(private _configService: ConfigService) {
  }
}