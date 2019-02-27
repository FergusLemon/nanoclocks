import axios, { AxiosResponse } from 'axios';

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
        }
      }
    )
    .then((res: AxiosResponse<any>) => res.data)
    .catch(error => {
      throw new Error("Bad response from API" + ".........." + error);
    });
  };
};

export default new CryptoCompareApi();
