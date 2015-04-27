
import Ember from 'ember';
import Firebase from 'firebase';


var session = Ember.Object.extend({
	ref : new Firebase("https://nutella.firebaseio.com"),

	addFirebaseCallback: function() {
		var session = this;
		var isNewUser = true;

		this.get("ref").onAuth(function(authData) {
			if (authData) {
				session.set("isAuthenticated", true);
			} else if (authData && isNewUser) {
				session.get("ref").child("users").child(authData.uid).set({
					provider: authData.provider,
					name: getName(authData)
				});
			} else {
				session.set("isAuthenticated", false);
			}
		});
	}.on("init"),

	loginFacebook: function() {
		return new Ember.RSVP.Promise((resolve, reject) => {
			this.get("ref").authWithOAuthPopup("facebook", function(error, user) {
				if (user) {
					resolve(user);
				} else {
					reject(error);
				}
			},

			{
				remember: "sessionOnly",
				scope: "email"
			});
		});
	},

	loginTwitter: function() {
			var session = this;
			return new Ember.RSVP.Promise(function(resolve, reject) {
				session.get('ref').authWithOAuthPopup('twitter', function(error, user) {
					if (user) { resolve(user); }
					else { reject(error); }
				});
			});
	},

	login: function() {
			var session = this;
			return new Ember.RSVP.Promise(function(resolve, reject) {
				session.get('ref').authWithPassword({
					email: "",
					password: ""
				}, function(error, user) {
					if (user) { resolve(user); }
					else { reject(error); }
				});
			});
	},


	createUser: function() {
		var session = this;

		return new Ember.RSVP.Promise(function(resolve, reject) {
			session.get('ref').createUser({
						name: "jess",
						email: "jess@handstack.com",
						password: "rain",
			},

			function(error, userData) {
					if (error === null) {
						resolve(userData.uid);
						session.set("isNewUser", true);
						alert("user created");
					} else {
						reject(error);
						alert("Error creating user");
					}
				});
		});
	},
	 /*
	 createUser: function() {
        var email = "jess@handstack.com";//createEmail.value;
        var password = "rain";//createPassword.value;
        this.authClient.createUser(email, password, function(error, user) {
            if (!error) {
                console.log('User Id: ' + user.id + ', Email: ' + user.email);
            }
        }
    )},*/


	logout: function() {
		this.get("ref").unauth();
	},


	currentUser: function() {
		return this.get("ref").getAuth();
	}.property("isAuthenticated")
});


export default {
	name: "Session",

	initialize: function (container, app) {
		app.register("session:main", session);
		app.inject("controller", "session", "session:main");
		app.inject("route", "session", "session:main");
	}
};


/*
var ref = new Firebase("https://nutella.firebaseio.com");
	ref.authWithOAuthPopup("facebook", function(error, authData) {
	  if (error) {
	    console.log("Login Failed!", error);
	  } else {
	    console.log("Authenticated successfully with payload:", authData);
	  }
});
*/