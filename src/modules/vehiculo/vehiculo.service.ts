import { Injectable } from '@nestjs/common';
import { HttpCustomService } from 'src/providers/http/http.service';
@Injectable()
export class VehiculoService {
    constructor(private readonly httpService:HttpCustomService){
    }
    public async buscaVehiculo()
    {
        return this.httpService.buscaVehiculo()
    }
}
