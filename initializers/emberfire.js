
import Ember from 'ember';

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

	login: function() {
		return new Promise(function(resolve, reject) {
			this.get("ref").authWithOAuthPopup("facebook", function(error, user){
				if (user) {
					resolve(user);
				} else {
					reject(error);
				}
			});
		});
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