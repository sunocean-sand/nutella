import Ember from 'ember';

export default Ember.Controller.extend({

	isEditing: false,

	isCompleted: function(key, value){
		var model = this.get('model');

		if (value === undefined) {
			return model.get('isCompleted');
		}
		else {
			model.set('isCompleted', value);
			model.save();
			return value;
		}
	}.property('model.isCompleted'),


	actions: {
		editTitle: function() {
			this.set('isEditing', true);
		},

		updateTitle: function() {
			this.set('isEditing', false);

			var model = this.get('model');

			if (Ember.isBlank(model.get('title'))) {
				model.rollback();
			}
			else {
				model.save();
			}
		}
	}
});
