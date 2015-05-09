import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr('string'),
	isCompleted: DS.attr('boolean', {defaultValue: false}),

	list: DS.belongsTo('list', {async: true}),
	user: DS.belongsTo('user', {async: true}),
	
	comments: DS.hasMany('comment', {async: true})
});
