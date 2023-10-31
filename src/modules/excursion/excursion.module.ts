import { Module } from '@nestjs/common';
import { ExcursionService } from './excursion.service';
import { ExcursionController } from './excursion.controller';
import { ProvidersModule } from 'src/providers/providers.module';
import { HttpCustomService } from 'src/providers/http/http.service';

@Module({
  imports: [ProvidersModule],
  providers: [ExcursionService,HttpCustomService],
  controllers: [ExcursionController]
})
export class ExcursionModule {}
