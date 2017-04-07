import * as database from './firebase';

export const service = (serviceName, mapper) => {
  const databaseRef = database.ref(serviceName);

  return {
    add: (object) => {
      databaseRef.push(object);
    },
    observe: (callback) => {
      databaseRef.on('value', (snap) => {
        const items = [];
        snap.forEach((child) => {
          items.push(mapper(child));
        });
        callback(items);
      });
    }
  };
};
