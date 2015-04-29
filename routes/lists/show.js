import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		return this.store.find('list', params.list_id);
	},

	renderTemplate: function() {
		this.render('lists/show', { controller: 'lists/show'} );

		this.render('todos', {
			into: 'lists/show',
			outlet: 'todos',
			controller: 'todo'
		});

	},

	isEditing: false,
});
