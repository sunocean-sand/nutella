import Ember from 'ember';
import Firebase from 'firebase';
import { moment, ago } from 'ember-moment/computed';



//var ref = new Firebase("https://nutella.firebaseio.com");


 
export default Ember.Route.extend({

	model: function() {
		var user = this.get('session.uid');
		if (user) {
			return this.store.find('user', user);
		} else  {
			return null;
		}
	},


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
			this.send('closeModal');
		},

		loginTwitter: function() {
			var controller = this;
				controller.get("session").loginTwitter().then(function(user) {
					console.log(user);
				});
			this.send('closeModal');
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
			Ember.$('#modal-dialog').removeClass('overlay');
	      Ember.$('.modal').modal('hide');
	      //Ember.$('.overlay').remove();
	      return this.disconnectOutlet({
	        outlet: 'modal',
	        parentView: 'application'
	      });
	    },


//ember-cli-cordova
	    back: function() {
      		history.back();
    	},

	    openLink: function(url) {
	      window.open(url, '_system');
	    },
	}
});