class SimplifiedMap {
  constructor(array) {
    this.array = array;
  }

  map(callback) {
    const arrayResult = [];
    for(let i = 0; i < this.array.length; i++) {
      arrayResult.push(callback(this.array[i], i, this.array));
    }

    return arrayResult;
  }
}

const arr = new SimplifiedMap([1, 2, 3, 4, 5]);
console.log(arr.map((item, index) => {
  return item * index;
}));