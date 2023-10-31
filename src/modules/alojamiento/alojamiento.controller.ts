import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlojamientoService } from './alojamiento.service';
import { CreateAlojamientoDto } from './dto/create-alojamiento.dto';
import { UpdateViajeDto } from './dto/update-alojamiento.dto';

@Controller('alojamiento')
export class AlojamientoController {
constructor(private readonly alojamientoService:AlojamientoService ) {}

@Get('alojamiento')
  public async alojamiento()
  {
        return this.alojamientoService.buscaAlojamiento();
  }
}
