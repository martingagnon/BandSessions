import * as database from './firebase';

const sessionsRef = database.ref('sessions');

export const add = (object) => {
  sessionsRef.push(object);
};

export const observe = (callback) => {
  sessionsRef.on('value', (snap) => {
    const items = [];
    snap.forEach((child) => {
      items.push({
        name: child.val().name,
        audio: child.val().audio,
        _key: child.key
      });
    });

    setTimeout(() => {
      callback(items);
    }, 1);
  });
};
