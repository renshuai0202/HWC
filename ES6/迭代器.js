const arr = [2, 4, 6, 8, 10];
const iterator = arr[Symbol.iterator]();
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next()); // { value: 10, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
console.log(iterator.next()); // { value: undefined, done: true }

console.log('----------------------------------------------');

const arr2 = [2, 4, 6, 8, 10];
const iterator2 = arr2.entries();
console.log(iterator2.next()); // { value: [ 0, 2 ], done: false }
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next()); // { value: [ 4, 10 ], done: false }
console.log(iterator2.next()); // { value: undefined, done: true }
console.log(iterator2.next()); // { value: undefined, done: true }

console.log('----------------------------------------------');

const map = new Map();
map.set('student1', 'zhangsan');
map.set('student2', 'lisi');
map.set('student3', 'wangwu');
const iterator3 = map.entries();
console.log(iterator3.next()); // { value: [ 'studen1', zhangsan ], done: false }
console.log(iterator3.next());
console.log(iterator3.next());
console.log(iterator3.next()); // { value: undefined, done: true }
console.log(iterator3.next()); // { value: undefined, done: true }

console.log('----------------------------------------------');

const obj = {
  name: 'zhangsan',
  age: 18,
  male : true
}
const arrayKeys = Object.keys(obj);
const arrayValues = Object.values(obj);
const arrayKeysValues = Object.entries(obj);
console.log(arrayKeys); // [ 'name', 'age', 'male' ]
console.log(arrayValues); // [ 'zhangsan', 18, true ]
console.log(arrayKeysValues); // [ [ 'name', 'zhangsan' ], [ 'age', 18 ], [ 'male', true ] ]



console.log('----------------------------------------------');


const str = 'abc';
const iterator5 = str[Symbol.iterator]();
console.log(iterator5.next()); // { value: 'a', done: false }
console.log(iterator5.next());
console.log(iterator5.next());
console.log(iterator5.next()); // { value: undefined, done: true }

// Map Set Array 
// 实例有entries方法 [Symbol.iterator]()方法

// 字符串 
// 实例有str[Symbol.iterator]()方法

// 对象 
// 原型有keys values entries方法