
import Ember from 'ember';
import Firebase from 'firebase';

var ref = new Firebase("https://nutella.firebaseio.com");

export default Ember.Route.extend({
	actions: {

		login: function() {
			var controller = this;
			controller.get("session").login();
		},

		loginFacebook: function() {
			var controller = this;
				controller.get("session").loginFacebook().then(function(user) {

				}, function() {

				});
		},

		loginTwitter: function() {
			var controller = this;
				controller.get("session").loginTwitter().then(function(user) {

				}, function() {

				});
		},


		logout: function() {
			this.get('session').logout();
		},

		openModal: function(modalName) {
	      return this.render(modalName, {
	        into: 'application',
	        outlet: 'modal'
	      });
	    },

		closeModal: function() {
		    return this.disconnectOutlet({
		      outlet: 'modal',
		      parentView: 'application'
		    });
		},

	}
});