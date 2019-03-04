function binarySearch (list: Array<string>, item: number) {
  let low: number = 0;
  let high: number = (list.length - 1);

  while (low <= high) {
    let mid: number = Math.floor((low + high) / 2);
    let guess: number = parseFloat(list[mid]);
    if (guess === item) {
      return mid;
    } else if (guess > item) {
      high = mid - 1;
    } else {
        low = mid + 1;
    }
  }
  return low;
};

export default binarySearch;
