
import Ember from 'ember';
import Firebase from 'firebase';


function parseAuthData(authData) {
	var parsedData = {};
	switch(authData.provider) {

		case 'facebook':
			parsedData.provider = authData.provider;
			parsedData.id = authData.facebook.id;
			parsedData.displayName = authData.facebook.displayName;
			parsedData.gender = authData.facebook.cachedUserProfile.gender;
			parsedData.language = authData.facebook.cachedUserProfile.locale;
			parsedData.imageThumbUrl = authData.facebook.cachedUserProfile.picture.data.url;
			parsedData.website = authData.facebook.cachedUserProfile.link;
			return parsedData;
/*
		case 'google':
			parsedData.provider = authData.provider;
			parsedData.id = authData.google.id;
			parsedData.displayName = authData.google.displayName;
			parsedData.gender = authData.google.cachedUserProfile.gender;
			parsedData.language = authData.google.cachedUserProfile.locale;
			parsedData.imageThumbUrl = authData.google.cachedUserProfile.picture;
			parsedData.website = authData.google.cachedUserProfile.link;
			return parsedData;
*/
		case 'twitter':
			parsedData.provider = authData.provider;
			parsedData.id = authData.twitter.id;
			parsedData.username = authData.twitter.username;
			parsedData.displayName = authData.twitter.displayName;
			parsedData.description = authData.twitter.cachedUserProfile.description;
			parsedData.location = authData.twitter.cachedUserProfile.location;
			parsedData.language = authData.twitter.cachedUserProfile.lang;
			parsedData.imageThumbUrl = authData.twitter.cachedUserProfile.profile_image_url_https || authData.twitter.cachedUserProfile.profile_image_url;
			parsedData.website = authData.twitter.cachedUserProfile.url;
			return parsedData;
	}
}



var session = Ember.Object.extend({
	ref : new Firebase("https://nutella.firebaseio.com"),

	addFirebaseCallback: function() {
		var session = this;
		var ref = this.get('ref');

		ref.onAuth(function(authData) {
			if (authData) {
				var user = parseAuthData(authData);
				session.set("isAuthenticated", true);
				session.set('uid', authData.uid);
				session.set('user', user);
				ref.child('users').child(authData.uid).set(user);
				
				/*
				var user = this.store.createRecord('user', {
					id: authData.uid,
					name: authData.provider.displayName,
				});
				user.save();
				*/

			} else {
				session.set("isAuthenticated", false);
			}
		});
	}.on("init"),


	loginFacebook: function() {
		var session = this;
		return new Ember.RSVP.Promise(function (resolve, reject) {
			session.get("ref").authWithOAuthPopup("facebook", function(error, user) {
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
			return new Ember.RSVP.Promise((resolve, reject) => {
				this.get('ref').authWithPassword({
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

        var properties = {
        	name: this.get('name'),
        	email: this.get('email'),
        	password: this.get('password')
        };

        this.get('ref').createUser(properties, function(error, user) {
            if (!error) {
                console.log('User name: ' + user.name + ', Email: ' + user.email);
                var userRef = new Firebase(usersPath + '/simplelogin:' + user.id);
                userRef.set({email: user.email}); // This is where you'd add Display Name, phone #, whatever

                session.login('password', email, password);
            }
        });
    },
*/


/*
	createUser: function() {
		var session = this;

		return new Ember.RSVP.Promise(function(resolve, reject) {
			session.createUser({
				name: name,
				email: e,
				password: p
			}, function(error) {
					if	(userData) {
						resolve();
						alert("user created");
					} else {
						reject(error);
						alert("Error creating user");
					}
				});
		});
	},
*/

/*					if (error) {
						reject(error);
						alert("there is an error");
					}
					if (user) {
						var newUser = session.store.createRecord('user', {
							name: user.name,
							email: user.email
						});

						var appUser = newUser.save().then(function(value) {
							session.set('currentUser', value);
							return value;
						});

						resolve(appUser);
						alert("appUser has been saved");
					}
				});
			});

			session.get('ref').createUser(email, password, function (error, user) {
					if (error) {
						reject(error);
					}
					if (user) {
						session.get('ref').login('password', {email: email, password: password});
					}
				});

		return Promise;
	},
*/


/*
						(error === null) {
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


	currentUser: Ember.computed('isAuthenticated', function() {
		return this.get('ref').getAuth();
	})
	/*
	currentUser: function() {
		return this.get("ref").getAuth();
	}.property("isAuthenticated")
	*/
});


export default {
	name: "Session",

	initialize: function (container, app) {
		app.register("session:main", session);
		app.inject("controller", "session", "session:main");
		app.inject("route", "session", "session:main");
	}
};

