
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
firebase.initializeApp(config)

var usersRef = firebase.database().ref('users');
var provider = new firebase.auth.GoogleAuthProvider();

var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

window.onload = function() {
var app = new Vue({
  // element to mount to
  el: '#app',
  // initial data
  data: {
    newUser: {
      name: '',
      email: '',
      password: ''
    },
    errors: []

  },
  // firebase binding
  // https://github.com/vuejs/vuefire
  firebase: {
    users: usersRef
  },
  // computed property for form validation state
  computed: {
    validation: function () {
      return {
        name: !!this.newUser.name.trim(),
        email: emailRE.test(this.newUser.email)
      }
    },
    //Kollar så att emailen är valid. Vet inte hur noga den är, snodd.
    isValid: function () {

      var validation = this.validation

      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  // methods
  methods: {
    addUser: function () {
      if (this.isValid) {
        usersRef.push(this.newUser)
        this.newUser.name = ''
        this.newUser.email = ''
        this.newUser.password = ''
      }
    },
    addGmailAuth: function () {
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
        console.log(errorcode);
      });
    },
    removeUser: function (user) {
      usersRef.child(user['.key']).remove()
    },
    checkForm: function (e) {
      if (this.name && this.age) {
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push('Name required.');
      }
      if (!this.password) {
        this.errors.push('Password required.');
      }

      e.preventDefault();
    }
  }
})
}
