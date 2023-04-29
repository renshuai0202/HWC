const logger = store => next => action => {
  console.log('dispatching: ', action);

  const result = next(action);

  const log = store.getState();
  console.log(log);

  return result;
}