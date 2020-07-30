var mainApp = {};
var accountInfo =  document.getElementById('acountInfo');
(function(){
    var firebase = app_fireBase;
    var uid = null;
    var email  = null;

  

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          uid = user.uid;
          email = user.email;
          accountInfo.innerHTML = email+" is using this website! ";
          //name = user.
        }else{
            //redirect to login page
            uid = null;
            email=null;
            window.location.replace("index.html");
        }
      });

      function logOut(){
          firebase.auth().signOut();
      }



     // mainApp.getEmail = getEmail;
      mainApp.logOut = logOut;
})()