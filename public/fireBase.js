

var app_fireBase = {};

(function(){


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB_diokp0qIbo1c9gt9Yqf1760h7NhY8PU",
    authDomain: "fptbustracking.firebaseapp.com",
    databaseURL: "https://fptbustracking.firebaseio.com",
    projectId: "fptbustracking",
    storageBucket: "fptbustracking.appspot.com",
    messagingSenderId: "388710403451",
    appId: "1:388710403451:web:030be84106a90439aa01de",
    measurementId: "G-N49KPSN492"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 


  app_fireBase=firebase;

})()