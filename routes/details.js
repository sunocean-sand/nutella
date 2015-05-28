//details.js

import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		return this.store.find('todo', params.todo_id);
	},

	renderTemplate: function(controller) {
	    this.render('details', {controller: controller});

		this.render('comments', {
			into: 'details',
			outlet: 'comments',
			controller: controller
		});
  	},

  	needs: ['todo', 'application'],

  	newComment: '',

  	actions: {
		createComment: function() {

			var newComment = this.controllerFor(this.routeName).get('newComment');
			var user = this.controllerFor('application').get('model');

			if (Ember.isBlank(newComment)) {return false;}

			var todo = this.modelFor(this.routeName);

			var comment = this.store.createRecord('comment', {
				message: newComment,
				todo: todo,
				user: user,
			});

			this.controllerFor(this.routeName).set('newComment', '');

			comment.save().then(function(comment) {
				todo.get('comments').addObject(comment);
				todo.save();
				user.get('comments').addObject(comment);
				user.save();
			});

		}
	},
});