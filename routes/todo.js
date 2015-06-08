import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    // return model
  },
  renderTemplate: function(controller) {
    this.render('lists.show', {controller: controller});
//    this.render('todos', {controller: 'todo'});
	
	this.render('todos', {
		into: 'lists.show',
		outlet: 'todos',
	});
  },


  actions: {
		createTodo: function() {
			var newTodoTitle = this.controllerFor(this.routeName).get('newTodoTitle');
			//var user = this.controllerFor('application').get('model');
			var user = this.session.get('uid');

			console.log(this);

			Ember.Logger.info('user:', user);

			if (Ember.isBlank(newTodoTitle)) {return false;}

			var list = this.modelFor(this.routeName);

			var todo = this.store.createRecord('todo', {
				title: newTodoTitle,
				list: list,
				user: user,
			});

			this.controllerFor(this.routeName).set('newTodoTitle', '');

			todo.save().then(function(todo) {
				list.get('todos').addObject(todo);
				list.save();
				user.get('todos').addObject(todo);
				user.save();
			});
		},


		deleteTodo: function(id) {
			var list = this.modelFor(this.routeName);

			this.store.find('todo', id).then(function(todo) {
				list.get('todos').removeObject(todo);
				list.save();

				todo.destroyRecord();
			});
		},


		deleteList: function() {
			var list = this.modelFor(this.routeName);
			list.destroyRecord();

			this.transitionTo('lists');
		},


		updateTitle: function() {
			var model = this.modelFor(this.routeName);

			if (Ember.isBlank(model.get('title'))) {
				model.rollback();
			}
			else {
				model.save();
			}
		},


/*
		countMe: function() {

			var user = this.controllerFor('application').get('model');
//			var todo = this.modelFor(this.routeName);
			//var todo = this.store.find('todo', params.todo_id);
			//var todo = this.store.find('todo', id);
			var todo = this.controllerFor('details').get('model');

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
*/


	},
});