import { Injectable } from '@nestjs/common';
import { HttpCustomService } from 'src/providers/http/http.service';

@Injectable()
export class AlojamientoService {
    constructor(private readonly httpService:HttpCustomService){
    }

    public async buscaAlojamiento()
    {
          return this.httpService.buscaAlojamiento()
    }
  
}

