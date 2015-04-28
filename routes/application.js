
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
					console.log(user);
				});
		},

		loginTwitter: function() {
			var controller = this;
				controller.get("session").loginTwitter().then(function(user) {
					console.log(user);
				});
		},


		logout: function() {
			this.get('session').logout();
		},

		createUser: function() {
			var controller = this;
			controller.get('session').createUser();
			alert(this.get('name'));
			/*.then(function(user) {
				}, function() {
				});*/
		},

		openModal: function(modal) {
	      this.render(modal, {
	        into: 'application',
	        outlet: 'modal'
	      });
	      return Ember.run.schedule('afterRender', function() {
	        Ember.$('.modal').modal('show');
	      });
	    },

		closeModal: function() {
	      Ember.$('.modal').modal('hide');
	      return this.disconnectOutlet({
	        outlet: 'modal',
	        parentView: 'application'
	      });
	    },

	}
});