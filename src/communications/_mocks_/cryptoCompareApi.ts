export const currentPriceSpec: object = {
  BTC: 0.00025000,
  USD: 1.05,
  EUR: 0.95,
  GBP: 0.9,
};

export const priceHistorySpec: object = {
  close: 0.9228,
  high: 0.9351,
  low: 0.9093,
  open: 0.9335,
  time: 1550620800,
  volumefrom: 1349848.03,
  volumeto: 1245639.76
};

export const getCurrentPriceMock = jest.fn().mockImplementation(() => new Promise((resolve, reject) => resolve([currentPriceSpec])));

export const getPriceInformationMock = jest.fn().mockImplementation(() => new Promise((resolve, reject) => resolve([priceHistorySpec])));

const mock = jest.fn().mockImplementation(() => {
  return {
    getCurrentPrice: getCurrentPriceMock,
    getPriceInformation: getPriceInformationMock,
  }
});

export default mock();
