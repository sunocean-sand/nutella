import Ember from 'ember';
 
export default Ember.Route.extend({
	model: function() {
		return this.store.find('list');
	},
 
	actions: {
		createList: function() {
		//0 check authentication
		/*
			if (session.isAuthenticated(false)) {
				return this.send('openModal');
			} else {
				//continue action
			}
		*/
		//1
			var newListTitle = this.controllerFor('lists').get('newListTitle');
			var user = this.controllerFor('application').get('model');
 
			if (Ember.isBlank(newListTitle)) { return false; }
 
		//2
			var list = this.store.createRecord('list', {
				title: newListTitle,
				user: user,
			});
 
 			//this.transitionTo('todo');
		//3
			this.controllerFor('lists').set('newListTitle', '');
 
		//4
			list.save().then(function(list) {
				user.get('list').addObject(list);
				user.save().then(function(success){
				  console.log('success', success);
				}, function(fail){
				  console.log('fail', fail);
				});
				//_this.transitionTo('lists.show', list); //4
			});
		//5
			//_this.transitionTo('lists.show');
 
		}
	}
});