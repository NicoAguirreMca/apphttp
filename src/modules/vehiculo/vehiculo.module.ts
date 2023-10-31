import { Module } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { VehiculoController } from './vehiculo.controller';
import { ProvidersModule } from 'src/providers/providers.module';
import { HttpCustomService } from 'src/providers/http/http.service';
@Module({
  imports: [ProvidersModule],
  providers: [VehiculoService,HttpCustomService],
  controllers: [VehiculoController]
})
export class VehiculoModule {}
