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

  return {
    add: (object) => {
      databaseRef.push(object);
    },
    observe: () => {
      databaseRef.on('value', observingMethod);
    },
    stopObserving: () => {
      databaseRef.off('value', observingMethod);
    }
  };
};
