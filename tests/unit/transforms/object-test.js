import EmObject from 'ember-object';
import { typeOf } from 'ember-utils';
import { moduleFor, test } from 'ember-qunit';

moduleFor('transform:object', 'Unit | Transform | object', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

test('Serializes and deserializes a plain object', function(assert) {
  let transform = this.subject();
  let object = {name: 'foo'};
  assert.ok(!!transform.serialize(object));
  assert.ok(!!transform.deserialize(object));
});

test('Serializes and deserializes an ember object instance', function(assert) {
  let transform = this.subject();
  let object = EmObject.create({name: 'foo'});

  assert.equal(typeOf(object), 'instance', 'The type is instance before serialization');
  assert.ok(object.get, 'Ember object instances have get method');
  assert.ok(!!transform.serialize(object));
  assert.ok(!!transform.deserialize(object));
  object = transform.deserialize(object);
  assert.equal(typeOf(object), 'object', 'The type is object after serialization');
  assert.notOk(object.get, 'POJO does not have get method');
});

test('Returns empty object for other data types', function(assert) {
  let transform = this.subject();
  let object = [];
  object = transform.deserialize(object);
  assert.equal(typeOf(object), 'object', 'The type is object after deserialization');

  object = 5;
  object = transform.deserialize(object);
  assert.equal(typeOf(object), 'object', 'The type is object after deserialization');

  object = 'FooBar';
  object = transform.deserialize(object);
  assert.equal(typeOf(object), 'object', 'The type is object after deserialization');
});