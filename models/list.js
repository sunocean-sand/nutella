//models/list.js

import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr('string'),

	todos: DS.hasMany('todo', {async: true}),
	username: DS.belongsTo('user', {async: true})
});