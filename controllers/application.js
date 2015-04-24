
import Ember from 'ember';
import Firebase from 'firebase';

var ref = new Firebase("https://nutella.firebaseio.com");

export default Ember.Controller.extend({
	actions: {
		login: function() {
				var controller = this;
				controller.get("session").login().then(function(user) {

				}, function() {

				});
		}
	}
});