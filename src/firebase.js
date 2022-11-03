// Firebase Cloud Messaging Configuration File. 
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

var firebaseConfig = {
  apiKey: "AIzaSyCHpJqt9EDn94ALWMgCD2CT6MA3pMtzlkE",
  authDomain: "applify-push.firebaseapp.com",
  projectId: "applify-push",
  storageBucket: "applify-push.appspot.com",
  messagingSenderId: "915532455726",
  appId: "1:915532455726:web:4769a81e32b55dbb2724bf"
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: `BGqxBvS-qIJuWkPKprSs3QoFxCBGJEKEAC2w2biOETs9ackY3a1xutyixYzcwGD8VQ2BkVGpBdwOClVHDwpdx4g` })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
  new Promise((resolve) => {    
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

  
