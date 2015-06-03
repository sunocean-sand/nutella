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

		},



		countMe: function() {

			var user = this.controllerFor('application').get('model');
			var todo = this.modelFor(this.routeName);
			//var todo = this.store.find('todo', params.todo_id);
			//var todo = this.store.find('todo', id);
			//var todo = this.controllerFor('details').get('model');

			var helper = this.store.createRecord('helper', {
				user: user,
				todo: todo,
			});

			helper.save().then(function(helper) {
				user.get('helper').addObject(helper);
				user.save();
				todo.get('helper').addObject(helper);
				todo.save();
			});

		},


	},
});