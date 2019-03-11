const regex: RegExp = /^$|^(?:0)$|^(?:0\.[0-9]{0,2})$|^(?:[1-9]{1}[0-9]{0,1})$|^(?:[1-9]{1}[0-9]{0,1}\.[0-9]{0,2})$/

export default regex;
//RegExp used for valdiating numbers entered as strings by the user, see
//issue #2 in the Github repo for explanation outline of the issue of
//controlled components and input fields of type number in HTML.
//Non-capturing groups were used.
//First RegExp group matches an empty string.
//Second group matches a single 0.
//Third group matches a single 0 with a decimal point
//and then between zero and two digits that range between 0-9.
//Fourth group matches numbers in the range 1-99.
//Fifth group matches numbers in the same range as the fourth group but
//includes decimal numbers up to two decimal places.
