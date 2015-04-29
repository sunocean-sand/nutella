import Ember from 'ember';
 
export default Ember.Route.extend({
	model: function() {
		return this.store.find('list');
	},
 
	actions: {
		createList: function() {
			var newListTitle = this.controllerFor('lists').get('newListTitle');
			//var user = this.get('session.user.displayName');
			var userId = this.get('session.user.uid');

			//var user = this.get('session.user');
 
			if (Ember.isBlank(newListTitle)) { return false; }
 
		//1
			var list = this.store.createRecord('list', {
				title: newListTitle,
				user: userId,
			});
 
		//2
			this.controllerFor('lists').set('newListTitle', '');
 
			var _this = this;
		//3
			list.save().then(function(list) {
				userId.get('lists').addObject(list);
				userId.save().then(function(success){
				  console.log('success', success)
				}, function(fail){
				  console.log('fail', fail)
				})
				//_this.transitionTo('lists.show', list); //4
			});
 
		}
	}
});