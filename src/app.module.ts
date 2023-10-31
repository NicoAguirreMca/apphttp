import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvidersModule } from './providers/providers.module';
import { ViajesModule } from './modules/viajes/viajes.module';
import { AlojamientoModule } from './modules/alojamiento/alojamiento.module';
import { ExcursionModule } from './modules/excursion/excursion.module';
import { VehiculoModule } from './modules/vehiculo/vehiculo.module';


@Module({
  imports: [ProvidersModule,
  ViajesModule,
  AlojamientoModule,
  ExcursionModule,
  VehiculoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
