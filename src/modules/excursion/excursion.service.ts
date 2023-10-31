import { Injectable } from '@nestjs/common';
import { HttpCustomService } from 'src/providers/http/http.service';
@Injectable()
export class ExcursionService {
    constructor(private readonly httpService:HttpCustomService){
    }

    public async buscaExcursion()
    {
          return this.httpService.buscaAlojamiento()
    }
}
