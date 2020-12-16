import * as  firebase from 'firebase';
// import { firebase } from '@firebase/app';
require('@firebase/firestore');

// Your web app's Firebase configuration
var fire = firebase.initializeApp({
  apiKey: 'AIzaSyDMWndg-5CgZWRmL7FvA5njsFyv9ASxw6U',
  authDomain: 'kartikey-barter-app.firebaseapp.com',
  databaseURL: 'https://kartikey-barter-app.firebaseio.com',
  projectId: 'kartikey-barter-app',
  storageBucket: 'kartikey-barter-app.appspot.com',
  messagingSenderId: '156997145193',
  appId: '1:156997145193:web:950aa98017d50cd42088f8',
});

export default firebase.firestore();