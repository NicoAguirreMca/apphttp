import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { access } from 'fs';
import { map,firstValueFrom,lastValueFrom } from 'rxjs';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class HttpCustomService {
  constructor(private readonly httpService: HttpService) {}
  public async apiFindAll() {
    try {
      const response = await firstValueFrom(
        this.httpService.get('https://rickandmortyapi.com/api/character'),
      );
      return response.data;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  private async apiGetToken()
  {
  
    try{
      const headersRequest = {
        'Content-Type': 'application/x-www-form-urlencoded', // afaik this one is not needed
      };
      const data = {
        client_id:'vz2KuAJyCNwXy03bygG9ddCcyD0ApMnc' ,
        client_secret:'fvQlVTeYMG3DAUiC',
        grant_type:'client_credentials'
      };


        const checkResultObservable= this.httpService.post("https://test.api.amadeus.com/v1/security/oauth2/token",data,{headers: headersRequest })
        const checkResult = await (await lastValueFrom(checkResultObservable)).data;
        const accessToken = checkResult.access_token;

        //console.log(accessToken);
        //return 0.2;
        return accessToken.toString();
        
        
    }
    catch(error){
      console.log(error)  
      //throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async searchVuelo()
    {

        /** https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=PAR&maxPrice=200'       -H 'Authorization: Bearer j4jwBt2vmN1dzwrArH1aA64I6XbJ**/
        const token = await this.apiGetToken()
        console.log(token);
        const headersRequest = {
          Authorization: `Bearer ${token}`, // afaik this one is not needed
        };
        /*const response=await firstValueFrom(
        this.httpService.get("https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=PAR&maxPrice=200")
        );*/
        try {
            
            const checkResultObservable= this.httpService.get("https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=PAR&maxPrice=200",{headers: headersRequest })
            //console.log(checkResultObservable);
            const checkResult = await (await lastValueFrom(checkResultObservable)).data;
            console.log(checkResult);
            return checkResult.data;
          } catch (error) {
            throw error;
          }
       
    }
}