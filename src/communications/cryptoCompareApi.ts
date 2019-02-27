import axios, { AxiosResponse } from 'axios';

interface PriceData {
  close: number,
  high: number,
  low: number,
  open: number,
  time: number,
  volumefrom: number,
  volumeto: number,
};

class CryptoCompareApi {
  apiKey = process.env.REACT_APP_CRYPTO_COMPARE_KEY;

  getPriceInformation = (): Promise<any> => {
    return axios.get('https://min-api.cryptocompare.com/data/histoday',
      {
        params: {
          fsym: "NANO",
          tsym: "USD",
          limit: 7,
        },
        headers: {
          authorization: "Apikey " + this.apiKey,
        },
        transformResponse: [(data: string) => {
          let parsedData = JSON.parse(data);
          return parsedData.Data.map((priceData: PriceData) => {
            let requiredData = {
              time: priceData["time"],
              high: priceData["high"],
            };
            return requiredData;
          })
        }]
      }
    )
    .then((res: AxiosResponse<object>) => res.data)
    .catch(error => {
      throw new Error("Bad response from API" + ".........." + error);
    });
  };
};

export default new CryptoCompareApi();
