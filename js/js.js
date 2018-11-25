
//Register funktion, kallas när man klickar på knappen atm med standard värden.
  var config = {
    apiKey: "AIzaSyC-K8CHZVB9ZgNA6f0rk-QSLSzSQaCOCr0",
    authDomain: "surrivan1punkt0.firebaseapp.com",
    databaseURL: "https://surrivan1punkt0.firebaseio.com",
    projectId: "surrivan1punkt0",
    storageBucket: "surrivan1punkt0.appspot.com",
    messagingSenderId: "882005054314"
  };
  //Initialisera Firebase typ, nån sa åt mig att ctrl+c:a det här. (google d.v.s)
  firebase.initializeApp(config);
  var provider = new firebase.auth.GoogleAuthProvider();

//Init Databas mot Firebase.
var database = firebase.database();

//Registrerar, har mail username och osaltat pass för tillfället. Ska kolla lite mer på google auth i FireBase efter jag fixat login.
function register(userId, pass, email) {
  firebase.database().ref('users/' + userId).set({
    email: email,
    password : pass
  });
}

//Registrerar med Google Authentication för Google-konto. Den får inte vara öppnad från filsystemet för att det ska fungera, måste öppnas i HTTP/HTTPS - Om ditt konto redan finns loggar den in istället. Ska göra det lite smidigare sen men funkar för tillfället.
function registerWithGoogleAuth()
{
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}


var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
  })

