import { Module } from '@nestjs/common';
import { AlojamientoService } from './alojamiento.service';

import { AlojamientoController } from './alojamiento.controller';
import { ProvidersModule } from 'src/providers/providers.module';
import { HttpCustomService } from 'src/providers/http/http.service';

@Module({
  imports:[ProvidersModule],
  providers: [AlojamientoService,HttpCustomService],
  controllers: [AlojamientoController]
})
export class AlojamientoModule {}
