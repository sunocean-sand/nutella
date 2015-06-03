import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.resource('lists', {path: '/'}, function() {
    this.route('show', {path: 'lists/:list_id'} );
  });
  this.route('todo', {path: 'todos/:todo_id'});
  this.route('details', {path: 'todos/:todo_id/details'});
});
