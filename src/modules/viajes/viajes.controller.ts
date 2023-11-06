import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { ViajesService } from './viajes.service';
import { CreateViajeDto } from './dto/create-viaje.dto'
import { UpdateViajeDto } from './dto/update-viaje.dto'

@Controller('viajes')
export class ViajesController {
  constructor(private readonly viajesService: ViajesService) {}

  @Post()
  create(@Body() createViajeDto: CreateViajeDto) {
    return this.viajesService.create(createViajeDto);
  }
 
  @Get('vuelos')
  public async vuelos(@Query() filterQuery)
  {
    const { pais,dato}=filterQuery;
    return this.viajesService.searchFlightbyCity(pais,dato)
  }

  @Get('ofertas')
  public async ofertas(@Query() filterQuery)
  {
    const {origin,dest,departureD,returnD,adults,max}=filterQuery;
    return this.viajesService.searchFlightbyOffers(origin,dest,departureD,returnD,adults,max)
  }

  /*@Get()
  findAll() {
    return this.viajesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viajesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateViajeDto: UpdateViajeDto) {
    return this.viajesService.update(+id, updateViajeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viajesService.remove(+id);
  }*/
}
