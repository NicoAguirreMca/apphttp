import { Module } from '@nestjs/common';
import { AlojamientoService } from './alojamiento.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from 'src/core/config/config.module';
import { HttpCustomService } from 'src/providers/http/http.service';
import { AlojamientoController } from './alojamiento.controller';


@Module({
  imports:[HttpModule,ConfigModule],
  providers: [AlojamientoService],
  exports: [HttpModule,HttpCustomService],
  controllers: [AlojamientoController]
})
export class AlojamientoModule {}
