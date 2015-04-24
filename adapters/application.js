import DS from 'ember-data';
import config from '../config/environment';
import Firebase from 'firebase';
import FirebaseAdapter from 'emberfire/adapters/firebase';

export default DS.FirebaseAdapter.extend({
  firebase: new window.Firebase(config.firebase)
});
