export const priceSpec: object = {
  close: 0.9228,
  high: 0.9351,
  low: 0.9093,
  open: 0.9335,
  time: 1550620800,
  volumefrom: 1349848.03,
  volumeto: 1245639.76
};

export const getPricesMock = jest.fn().mockImplementation(() => new Promise((resolve, reject) => resolve([priceSpec])));

const mock = jest.fn().mockImplementation(() => {
  return {
    getPrices: getPricesMock
  }
});

export default mock();
