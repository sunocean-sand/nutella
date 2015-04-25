
import Ember from 'ember';
import Firebase from 'firebase';


var session = Ember.Object.extend({
	ref : new Firebase("https://nutella.firebaseio.com"),

	addFirebaseCallback: function() {
		var session = this;

		this.get("ref").onAuth(function(authData) {
			if (authData) {
				session.set("isAuthenticated", true);
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

/*
	createUser: function() {
		var session = this;
		return new Ember.RSVP.Promise(function(resolve, reject) {
			session.get('ref').createUser({
				email: "",
				password: ""
			},	function (error, user) {

				if (user) {
					resolve(user);
				} else {
					reject(error);
				}
			}); 
		});
	},
*/

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