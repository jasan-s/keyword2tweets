import firebase from 'firebase'


const config = {
    apiKey: 'AIzaSyBlMt1MDv9Li9jXRKQT-fX98diEGPdsuvY',
    authDomain: 'keyword2tweets.firebaseapp.com',
    databaseURL: 'https://keyword2tweets.firebaseio.com',
    projectId: 'keyword2tweets',
    storageBucket: 'keyword2tweets.appspot.com',
    messagingSenderId: '667937503128'
}

firebase.initializeApp(config)


export const database = firebase.database()
export const firebaseRef = firebase.database().ref()
