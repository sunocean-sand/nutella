// app/adapters/application.js
import DS from 'ember-data';
import config from '../config/environment';




import Firebase from 'firebase';
import FirebaseAdapter from 'emberfire/adapters/firebase';


 
export default FirebaseAdapter.extend({
  firebase: new Firebase(config.firebase)
});



/*
export default DS.ActiveModelAdapter.extend({
  host: config.apiUrl
});
*/