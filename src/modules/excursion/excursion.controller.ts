import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExcursionService } from './excursion.service';
import { CreateExcursionDto } from './dto/create-excursion.dto';



@Controller('excursion')
export class ExcursionController {
constructor(private readonly excursionService:ExcursionService ) {}

@Get('excursion')
  public async excursion()
  {
        return this.excursionService.buscaExcursion();
  }
}