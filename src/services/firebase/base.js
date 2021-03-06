import * as database from './firebase';

export const service = (serviceName, mapper, callback) => {
  const databaseRef = database.ref(serviceName);

  const observingMethod = (snap) => {
    const items = [];
    snap.forEach((child) => {
      items.push(mapper(child));
    });
    callback(items);
  };

  const singleObservingMethod = (child) => {
    const items = [];
    items.push(mapper(child));
    callback(items);
  };

  return {
    add: (object) => {
      return databaseRef.push(object).key;
    },
    observe: () => {
      databaseRef.on('value', observingMethod);
    },
    stopObserving: () => {
      databaseRef.off('value', observingMethod);
      databaseRef.off('value', singleObservingMethod);
    },
    observeOnce: () => {
      databaseRef.once('value', singleObservingMethod);
    },
    update: (object) => {
      return databaseRef.update(object);
    },
    set: (object) => {
      return databaseRef.set(object);
    },
    remove: () => {
      return databaseRef.remove();
    }
  };
};
