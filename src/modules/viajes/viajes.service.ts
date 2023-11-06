import { Injectable } from '@nestjs/common';
import { CreateViajeDto } from './dto/create-viaje.dto';
import { UpdateViajeDto } from './dto/update-viaje.dto';
import { HttpCustomService } from 'src/providers/http/http.service';

@Injectable()
export class ViajesService {
    constructor(private readonly httpService:HttpCustomService){
        
    }
  create(createViajeDto: CreateViajeDto) {
    return 'This action adds a new viaje';
  }

  findAll() {
    return `This action returns all viajes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} viaje`;
  }

  public async accessvuelo(pais:string,dato:string)
  {
        return this.httpService.searchVuelo(pais,dato)
  }

  update(id: number, updateViajeDto: UpdateViajeDto) {
    return `This action updates a #${id} viaje`;
  }

  remove(id: number) {
    return `This action removes a #${id} viaje`;
  }
}