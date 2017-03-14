import * as firebaseLib from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAF_OjdYBSF_la7w4sL6JJnRmIO7yjf1Jw",
  authDomain: "bandsessions-24c63.firebaseapp.com",
  databaseURL: "https://bandsessions-24c63.firebaseio.com",
  storageBucket: "bandsessions-24c63.appspot.com",
  messagingSenderId: "663381938133"
};
const firebaseApp = firebaseLib.initializeApp(firebaseConfig);
const itemsRef = firebaseApp.database().ref("/tests2");

const addItem = (object) => {
  itemsRef.push(object);
}

const observeItems = (callback) => {
    itemsRef.on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      callback(items);      
    });  
}

export default {
  addItem,
  observeItems
}
