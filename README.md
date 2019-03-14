# NanoClocks

### Build Status
[![Build Status](https://travis-ci.org/FergusLemon/nanoclocks.svg?branch=master)](https://travis-ci.org/FergusLemon/nanoclocks)

Travis CI used for continuous integration.

### Overview
NanoClocks is a website that allows users to check the last time $NANO was traded at a given price in $USD.  Nano is an innovative cryptocurrency that implements a block lattice to allow users of the network to send transactions without incurring fees and transactions times are very fast, as of v18 of the Nano Protocol transaction times have been in the region of one second. NanoClocks uses price data made available by [CryptoCompare's API](https://min-api.cryptocompare.com/documentation?key=Historical&cat=dataHistoday). The availble high and low prices for each day are retrieved and then the range between those prices created with each $0.01 increment assigned to that day also due to more granular price information at lower level time frames being unavailable or too granular.

The plan is to keep adding features to NanoClocks so that it will offer better price clocks but also extend beyond price to other popular hubs of information on Nano such as Twitter, the Nano block lattice and more.

![NanoClocks Homepage](/public/nanoClocksHomepage.jpg)

### Tests
Unit tests can be located in the `test` directory and can be run from the `fairBnB` directory using the command `npm test`. Feature tests can be found in the `test/feature` directory and can be run from the same home directory as the unit tests using the command `npm run featureTest`.  Open issues on this project include improving the code coverage, extending feature tests to Firefox, following up with the TestCafe team with a query on selecting non-visible elements without the need to use the size of the element and its position relative to the viewport and finally improve testing of AJAX calls.

### Testing
##### Tools
  - Jest for unit testing, mocks and spies.
  - Travis CI for continous integration testing.

### Technologies Used
##### Languages
   - Typescript
   - CSS
   
##### Front-end
   - React

#### Other
   - CryptoCompare API for Daily Price Data
   
### License
MIT (c) 2019 Fergus Lemon

See `MIT.LICENSE` for more detail.
