import * as database from './firebase';
import RNFetchBlob from 'react-native-fetch-blob';

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

export const download = async (url) => {
  const downloadResult = await RNFetchBlob.config({fileCache: true}).fetch('GET', url);
  return downloadResult.path();
};
