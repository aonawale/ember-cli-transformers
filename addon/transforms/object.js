import { typeOf } from 'ember-utils';
import Transform from 'ember-data/transform';

const isPlainObject = (object) => {
  return typeOf(object) === 'object';
};

export default Transform.extend({
  deserialize(serialized) {
    return isPlainObject(serialized) ? serialized : {};
  },

  serialize(deserialized) {
    return isPlainObject(deserialized) ? deserialized : {};
  }
});
