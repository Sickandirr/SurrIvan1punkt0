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

//Init Databas mot Firebase.
var database = firebase.database();

//Registrerar, har mail username och osaltat pass för tillfället. Ska kolla lite mer på google auth i FireBase efter jag fixat login.
function register(userId, pass, email) {
  firebase.database().ref('users/' + userId).set({
    email: email,
    password : pass
  });
}

