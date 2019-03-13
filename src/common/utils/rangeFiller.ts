const priceRange = (start: number, stop: number, step: number = 0.01): Array<string> =>
  Array(Math.ceil((stop + step - start) / step))
    .fill(start)
    .map((x: number, y: number) => (x + y * step).toFixed(2))

export default priceRange;

//Having tried to implement something much more complicated, this funciton was
//found on Stack Overflow, posted by user Kutyel, and is the best way I found
//to implement the functionality required so props to him.
//https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
