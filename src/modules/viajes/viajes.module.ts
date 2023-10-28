import { Module } from '@nestjs/common';
import { ViajesService } from './viajes.service';
import { ViajesController } from './viajes.controller';
import { ProvidersModule } from 'src/providers/providers.module';
import { HttpCustomService } from 'src/providers/http/http.service';

@Module({
  imports:[ProvidersModule],
  providers: [ViajesService,HttpCustomService],
  controllers: [ViajesController]
})
export class ViajesModule {}
