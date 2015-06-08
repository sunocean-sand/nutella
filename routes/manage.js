import Ember from 'ember';

export default Ember.Route.extend({
	/*
	model: function(params) {
		return this.store.find('list', params.list_id);
	},
	*/

	model: function() {
		return this.store.find('list');
	},

	renderTemplate: function() {
		this.render('manage');

		this.render('lists/show', {
			into: 'manage',
			outlet: 'lists/show',
			controller: 'lists/show'
		});

	},

	needs: ['list'],
});
