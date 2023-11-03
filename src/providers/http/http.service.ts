import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { access } from 'fs';
import { map,firstValueFrom,lastValueFrom } from 'rxjs';
import { ErrorManager } from 'src/utils/error.manager';
import { ConfigModule } from '../../core/config/config.module';
import { ConfigService } from '../../core/config/config.service';

@Injectable()
export class HttpCustomService {
  private client_id:string;
  private client_secret:string;
  constructor(private readonly httpService: HttpService) {
    this.client_id=process.env.CLIENT_ID;
    this.client_secret=process.env.CLIENT_SECRET;
  }
  
  private async apiGetToken()
  {
  
    try{
      const headersRequest = {
        'Content-Type': 'application/x-www-form-urlencoded', // afaik this one is not needed
      };
      //console.log(process.env.CLIENT_ID)
      //console.log(process.env.CLIENT_SECRET)
      /*const data = {
        client_id:process.env.CLIENT_ID ,
        client_secret:process.env.CLIENT_SECRET,
        grant_type:'client_credentials'
      };*/
      const data = {
        client_id:'vz2KuAJyCNwXy03bygG9ddCcyD0ApMnc ',
        client_secret:'fvQlVTeYMG3DAUiC',
        grant_type:'client_credentials'
      };

        const checkResultObservable= this.httpService.post("https://test.api.amadeus.com/v1/security/oauth2/token",data,{headers: headersRequest })
        const checkResult = await (await lastValueFrom(checkResultObservable)).data;
        const accessToken = checkResult.access_token;

        //console.log(accessToken);
        return accessToken.toString();
        
        
    }
    catch(error){
      //console.log(error)  
      //throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async searchVuelo()
    {

        const token = await this.apiGetToken()
        console.log(token);
        const headersRequest = {
          Authorization: `Bearer ${token}`
        };
        
        try {
            
            const checkResultObservable= this.httpService.get("https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=PAR&maxPrice=200",{headers: headersRequest })
            //console.log(checkResultObservable);
            const checkResult = await (await lastValueFrom(checkResultObservable)).data;
            console.log(checkResult);
            return checkResult.data;
          } catch (error) {
            //console.log(error);
          }
       
  }
  public async buscaAlojamiento()
    {

        const token = await this.apiGetToken()
        console.log(token);
        const headersRequest = {
          Authorization: `Bearer ${token}`
        };
        
        try {
            //DOCS DE API 
            //https://developers.amadeus.com/self-service/category/hotels/api-doc/hotel-list/api-reference
            const checkResultObservable= this.httpService.get("https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=PAR",{headers: headersRequest })
            const checkResult = await (await lastValueFrom(checkResultObservable)).data;
            console.log(checkResult);
            return checkResult.data;
          } catch (error) {
            //console.log(error);
          }
       
  }
  public async buscaExcursion()
    {

        const token = await this.apiGetToken()
        console.log(token);
        const headersRequest = {
          Authorization: `Bearer ${token}`
        };
        
        try {
           	//DOCS DE API
		        //https://developers.amadeus.com/self-service/category/destination-experiences/api-doc/tours-and-activities/api-reference
            // ver variables latitude=41.397158&longitude=2.160873&radius=1
            const checkResultObservable= this.httpService.get("https://test.api.amadeus.com/v1/shopping/activities?latitude=41.397158&longitude=2.160873&radius=1",{headers: headersRequest })
            //console.log(checkResultObservable);
            const checkResult = await (await lastValueFrom(checkResultObservable)).data;
            console.log(checkResult);
            return checkResult.data;
          } catch (error) {
            //console.log(error);
          }
       
  }
  public async buscaVehiculo()
    {

        const token = await this.apiGetToken()
        console.log(token);
        const headersRequest = {
          Authorization: `Bearer ${token}`
        };

        const data ={
          "startLocationCode": "CDG",
          "endAddressLine": "Avenue Anatole France, 5",
          "endCityName": "Paris",
          "endZipCode": "75007",
          "endCountryCode": "FR",
          "endName": "Souvenirs De La Tour",
          "endGeoCode": "48.859466,2.2976965",
          "transferType": "PRIVATE",
          "startDateTime": "2023-11-10T10:30:00",
          "providerCodes": "TXO",
          "passengers": 2,
          "stopOvers": [
            {
              "duration": "PT2H30M",
              "sequenceNumber": 1,
              "addressLine": "Avenue de la Bourdonnais, 19",
              "countryCode": "FR",
              "cityName": "Paris",
              "zipCode": "75007",
              "name": "De La Tours",
              "geoCode": "48.859477,2.2976985",
              "stateCode": "FR"
            }
          ],
          "startConnectedSegment": {
            "transportationType": "FLIGHT",
            "transportationNumber": "AF380",
            "departure": {
              "localDateTime": "2023-11-10T09:00:00",
              "iataCode": "NCE"
            },
            "arrival": {
              "localDateTime": "2023-11-10T10:00:00",
              "iataCode": "CDG"
            }
          },
          "passengerCharacteristics": [
            {
              "passengerTypeCode": "ADT",
              "age": 20
            },
            {
              "passengerTypeCode": "CHD",
              "age": 10
            }
          ]
          };
       	
        try {
              //DOCS API
		          //https://developers.amadeus.com/self-service/category/cars-and-transfers/api-doc/transfer-search/api-reference
            const checkResultObservable= this.httpService.post("https://test.api.amadeus.com/v1/shopping/transfer-offers",data,{headers: headersRequest })
            //console.log(checkResultObservable);
            const checkResult = await (await lastValueFrom(checkResultObservable)).data;
            console.log(checkResult);
            return checkResult.data;
          } catch (error) {
            //console.log(error);
          }
       
  }


}
