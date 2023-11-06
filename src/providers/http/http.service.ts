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
  

  public async searchFlightbyOffers(origin:string,dest:string,departureD:string,returnD:string,adults:string,max:string){
    const token = await this.apiGetToken()
    console.log(token);
    //https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=DEL&destinationLocationCode=LON&departureDate=2023-11-07&returnDate=2023-12-01&adults=2&max=2
    console.log(`https://test.api.amadeus.com/v1/shopping/flight-offers/pricing`);
    const headersRequest = {
      Authorization: `Bearer ${token}`
    };
    
    try {
        
        //origin code = CODIGO ORIGEN 
        //destination code = CODIGO DESTINO
        //departure = SALIDA VUELO
        //return =  RETORNO VUELO
        //adults = CANT ADULTOS
        //max = CANT PERSONAS
        
        const checkResultObservable = this.httpService.get(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${dest}&departureDate=${departureD}&returnDate=${returnD}&adults=${adults}&max=${max}`,{headers: headersRequest })
        console.log(checkResultObservable);
        const checkResult = await (await lastValueFrom(checkResultObservable)).data;
        console.log(checkResult);
        return checkResult.data;
      } catch (error) {
        //console.log(error);
      }  
  }
  
  public async createFlightOrders()
  {
    const token = await this.apiGetToken()
    console.log(token);
    const headersRequest = {
      Authorization: `Bearer ${token}`
    };
    /*cuerpo de request 
      https://developers.amadeus.com/self-service/category/flights/api-doc/flight-create-orders/api-reference
    */
    const data = {

    }
    try {
        
        
        const checkResultObservable = this.httpService.post(`https://test.api.amadeus.com/v1/booking/flight-orders`,data,{headers: headersRequest })
        console.log(checkResultObservable);
        const checkResult = await (await lastValueFrom(checkResultObservable)).data;
        console.log(checkResult);
        return checkResult.data;
      } catch (error) {
        //console.log(error);
      }  

  }

  public async searchFlightbyCity(city:string,cant_pasajero:string)
    {

        const token = await this.apiGetToken()
        console.log(token);
        console.log(`https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${city}`);
        console.log(cant_pasajero);
        const headersRequest = {
          Authorization: `Bearer ${token}`
        };
        
        try {
            //flight offers search GET
            //https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=DEL&destinationLocationCode=LON&departureDate={{departureDate}}&returnDate={{returnDate}}&adults=2&max=5
            
            //flight offers PRICE
            //https://test.api.amadeus.com/v1/shopping/flight-offers/pricing

            //flight airport & city search
            //https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=MUC&countryCode=DE

            //CODIGOS DE AEROPUERTOS DISPONIBLES == city:string
            //https://www.nationsonline.org/oneworld/IATA_Codes/airport_code_list.htm#google_vignette
            
            const checkResultObservable= this.httpService.get(`https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${city}`,{headers: headersRequest })
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
