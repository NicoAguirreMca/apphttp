import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvidersModule } from './providers/providers.module';
import { ViajesModule } from './modules/viajes/viajes.module';

@Module({
  imports: [ProvidersModule,
  ViajesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
