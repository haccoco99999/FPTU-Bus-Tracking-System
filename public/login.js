(function () {
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        //if(authResult.)
        // console.log(authResult.user.uid)

        firebase.firestore().collection('Admins').doc(authResult.user.uid)
          .get().then(function (doc) {
            if (doc.exists) {
              console.log("Document data:", doc.data());
              window.location.replace("home.html");
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
              window.location.replace("userNotAdmin.html");
            }
          }).catch(function (error) {
            console.log("Error getting document:", error);
            window.location.replace("404.html");
          });


        // if (firebase.firestore().collection('Admins').doc(authResult.user.uid).get()) {
        //   // const userId = currentUser.uid;
        //   // Manually redirect.
        //   window.location.replace("home.html");
        //   console.log("E:" + authResult.user.uid)
        // } else {
        //   console.log("NE:" + authResult.user.uid)

        //   window.location.replace("userNotAdmin.html");
        // }


        return false;
      },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      },
      signInFailure: function (error) {
        // For merge conflicts, the error.code will be
        // 'firebaseui/anonymous-upgrade-merge-conflict'.
        if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
          return Promise.resolve();
        }
        // The credential the user tried to sign in with.
        var cred = error.credential;
        // Copy data from anonymous user to permanent user and delete anonymous
        // user.
        // ...
        // Finish sign-in after data is copied.
        return firebase.auth().signInWithCredential(cred);
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'home.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      //firebase.auth.GithubAuthProvider.PROVIDER_ID,
      //firebase.auth.EmailAuthProvider.PROVIDER_ID,

    ],
    // Terms of service url.
    tosUrl: 'home.html',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  ui.start('#firebaseui-auth-container', uiConfig);
})()


