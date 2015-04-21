import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return this.store.find('list');
	},

	actions: {
		createList: function() {
			var newListTitle = this.controllerFor('lists').get('newListTitle');

			if (Ember.isBlank(newListTitle)) { return false; }

		//1
			var list = this.store.createRecord('list', {
				title: newListTitle
			});

		//2
			this.controllerFor('lists').set('newListTitle', '');

			var _this = this;

		//3
		list.save().then(function(list) {
			_this.transitionTo('lists.show', list); //4
		});

		}
	}
});
