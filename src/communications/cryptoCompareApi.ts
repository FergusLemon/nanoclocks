import axios from 'axios';

class CryptoCompareApi {
  apiKey = process.env.REACT_APP_CRYPTO_COMPARE_API;

  getPrices = () => {
    return axios.get('https://min-api.cryptocompare.com/data/histoday',
      {
        params: {
          fsym: "NANO",
          tsym: "USD",
          limit: 550,
        },
        headers: {
          authorization: "Apikey " + this.apiKey,
          accept: 'application/json'
        },
        transformResponse: [data => {
          return JSON.parse(data).map(({ time, high }) => ({
            time,
            high
          }));
        }],
      }
    )
    .then(res => res.data)
    .catch(error => {
      throw new Error("Bad response from API");
    });
  };
};

export default new CryptoCompareApi();
