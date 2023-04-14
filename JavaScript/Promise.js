class MyPromise {
  constructor(executor) {
    this.status = 'pending';
    this.value = null;
    this.reason = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = value => {
      if(this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    }

    const reject = reason => {
      if(this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }

    try {
      executor(resolve, reject);
    } catch(e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // throw reason
    onRejected = typeof onRejected === 'function' ? onRejected: reason => { throw reason };

    const promise2 = new MyPromise((resolve, reject) => {
      if(this.status === 'fulfilled') {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch(e) {
            reject(e);
          }
        }, 0)
      } else if(this.status === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch(e) {
            reject(e)
          }
        }, 0);
      } else {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch(e) {
              reject(e);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch(e) {
              reject(e);
            }
          }, 0)
        })
      }
    })
    // 注意return
    return promise2;
  }

  catch(onRejected) {
    // 注意return
    return this.then(null, onRejected);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if(promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise.'));
  }

  let called = false;
  if(x != null && (typeof x === 'function' || typeof x === 'object')) {
    try {
      const then = x.then;
      if(typeof then === 'function') {
        then.call(x, y => {
          if(called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, r => {
          if(called) return;
          called = true;
          reject(r);
        })
      } else {
        // resolve(x)
        resolve(x);
      }
    } catch(e) {
      if(called) return;
      called = true;
      reject(e);
    }
  } else {
    // resolve(x)
    resolve(x);
  }
}

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject('1秒定时器已执行');
  }, 1000);
})

p.then(value => {
  console.log('123', value);
}).catch(reason => {
  console.log('出错了', reason);
})