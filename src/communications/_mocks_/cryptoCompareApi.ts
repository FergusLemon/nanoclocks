export const priceSpec: object = {
  time: 1508025600,
  high: 0.6,
};

export const getPricesMock = jest.fn().mockImplementation(() => new Promise((resolve, reject) => resolve([priceSpec])));

const mock = jest.fn().mockImplementation(() => {
  return {
    getPrices: getPricesMock
  }
});

export default mock();
