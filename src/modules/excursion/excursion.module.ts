import { Module } from '@nestjs/common';
import { ExcursionService } from './excursion.service';
import { ExcursionController } from './excursion.controller';

@Module({
  providers: [ExcursionService],
  controllers: [ExcursionController]
})
export class ExcursionModule {}
