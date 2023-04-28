function* generator() {
  console.log('start');
  yield 1;
  console.log('continue');
  yield 2;
  console.log('end');
}

const gen = generator();

console.log(gen.next());
// start
// { value: 1, done: false }

console.log(gen.next());
// continue
// {value: 2, done: false }

console.log(gen.next());
// end
// { value: undefined, done: true }

console.log('----------------------------------------');

function* fibonacci() {
  let [prevent, current] = [0, 1];
  while(true) {
    yield current;
    [prevent, current] = [current, current + 1];
  } 
}

const generatorFibonacci = fibonacci();

console.log(generatorFibonacci.next());
console.log(generatorFibonacci.next());
console.log(generatorFibonacci.next());
console.log(generatorFibonacci.next());
console.log(generatorFibonacci.next());
