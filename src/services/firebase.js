import * as firebaseLib from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAF_OjdYBSF_la7w4sL6JJnRmIO7yjf1Jw',
  authDomain: 'bandsessions-24c63.firebaseapp.com',
  databaseURL: 'https://bandsessions-24c63.firebaseio.com',
  storageBucket: 'bandsessions-24c63.appspot.com',
  messagingSenderId: '663381938133'
};
const firebaseApp = firebaseLib.initializeApp(firebaseConfig);

export const ref = (path) => {
  return firebaseApp.database().ref(path);
};

export const storageFile = (filePath) => {
  return firebaseApp.storage().ref().child(filePath);
}
