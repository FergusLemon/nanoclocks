# NanoClocks

### Build Status
[![Build Status](https://travis-ci.org/FergusLemon/nanoclocks.svg?branch=master)](https://travis-ci.org/FergusLemon/nanoclocks)
[![Cypress.io tests](https://img.shields.io/badge/cypress.io-tests-green.svg?style=flat-square)](https://cypress.io)


### Overview
NanoClocks is a website that allows users to check the last time $NANO was traded at a given price in $USD, available [here](https://nanoclocks.herokuapp.com/).  Nano is an innovative cryptocurrency that implements a block lattice to allow users of the network to send transactions without incurring fees and transactions times are very fast, as of v18 of the Nano Protocol transaction times have been in the region of one second. NanoClocks uses price data made available by [CryptoCompare's API](https://min-api.cryptocompare.com/documentation?key=Historical&cat=dataHistoday). The availble high and low prices for each day are retrieved and then the range between those prices created with each $0.01 increment assigned to that day due to more granular price information at lower level time frames being unavailable. Furthermore, daily high / low price data for the period from the start of trading to the date when the CryptoCompare API offers data has been collated and included in a JSON file available in the `./src/common/utils directory`.

The plan is to keep adding features to NanoClocks so that it will offer better price clocks but also extend beyond price to other popular hubs of information on Nano such as Twitter, the Nano network itself.

![NanoClocks Homepage](/public/nanoClocksHomepage.jpg)

### Tests
Unit tests for each component are located in the component's directory in the `_tests_` sub-directory. They can be run using the command `npm test` from the root directory.

Integration tests can be run using the command `npm run cypress:open` from the root directory.

### Testing
##### Tools
  - Jest for unit testing, mocks and spies
  - Enzyme for DOM testing
  - Cypress for integration testing
  - Travis CI for continous integration testing

### Technologies Used
##### Languages
   - Typescript
   - CSS
   
##### Front-end
   - React

#### Other
   - CryptoCompare API for Daily Price Data
   - Axios for handling the fetching of data from the CC API
   - MomentJS for handling dates
   - Font Awesome for social media brand logos
   - [CSVtoJSON](https://csv.keyangxiang.com/) for converting historical price data into JSON, a very useful and easy to use tool
   
### License
MIT (c) 2019 Fergus Lemon

See `MIT.LICENSE` for more detail.
