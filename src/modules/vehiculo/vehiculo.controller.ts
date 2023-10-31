import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';



@Controller('vehiculo')
export class VehiculoController {
constructor(private readonly vehiculoService:VehiculoService ) {}

@Get('vehiculo')
  public async vehiculo()
  {
        return this.vehiculoService.buscaVehiculo();
  }
}
