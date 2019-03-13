import axios, { AxiosResponse } from 'axios';

interface PriceData {
  high: number,
  low: number,
  time: number,
};

class CryptoCompareApi {
  apiKey = process.env.REACT_APP_CRYPTO_COMPARE_KEY;

  getPriceInformation = (): Promise<any> => {
    return axios.get('https://min-api.cryptocompare.com/data/histoday',
      {
        params: {
          fsym: "NANO",
          tsym: "USD",
          limit: 550,
        },
        headers: {
          authorization: "Apikey " + this.apiKey,
        },
        transformResponse: [(data: string) => {
          let parsedData = JSON.parse(data);
          return parsedData.Data.map((priceData: PriceData) => {
            let requiredData = {
              time: priceData["time"],
              high: parseFloat(priceData["high"].toFixed(2)),
              low: parseFloat(priceData["low"].toFixed(2)),
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
