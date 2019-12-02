const {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  castToNumber,
  castToString,
  castToBoolean,
  castToArray,
  getCaster
} = require('../lib/types.js');

describe('validator module', () => {
  describe('basic validation', () => {
    it('properly tells if a value is a number', () => {
      expect(isNumber(3)).toBeTruthy();
      expect(isNumber('hi')).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber(() => {})).toBeFalsy();
      expect(isNumber(true)).toBeFalsy();
    });

    it('properly tells if a value is a string', () => {
      expect(isString('hi')).toBeTruthy();
      expect(isString(3)).toBeFalsy();
      expect(isString(true)).toBeFalsy();
      expect(isString(() => {})).toBeFalsy();
      expect(isString()).toBeFalsy();
    });

    it('properly tells if a value is a boolean', () => {
      expect(isBoolean(true)).toBeTruthy();
      expect(isBoolean(false)).toBeTruthy();
      expect(isBoolean('true')).toBeFalsy();
      expect(isBoolean(1)).toBeFalsy();
      expect(isBoolean(0)).toBeFalsy();
    });

    it('properly tells if a value is an array', () => {
      expect(isArray([])).toBeTruthy();
      expect(isArray([1, 2, 3])).toBeTruthy();
      expect(isArray([[1, 2], [3, 4]])).toBeTruthy();
      expect(isArray(1)).toBeFalsy();
      expect(isArray('array')).toBeFalsy();
      expect(isArray({ name: 'Me', color: 'red' })).toBeFalsy;
    });

    it('properly tells if a value is an object', () => {
      expect(isObject({})).toBeTruthy();
      expect(isObject({ name: 'Me', color: 'red' })).toBeTruthy();
      expect(isObject([1, 2])).toBeTruthy();
      expect(isObject(1)).toBeFalsy();
      expect(isObject('Hi')).toBeFalsy();
      expect(isObject(true)).toBeFalsy;
    });

    it('properly tells if a value is a function', () => {
      expect(isFunction(() => {})).toBeTruthy();
      expect(isFunction({ name: 'Me', color: 'red' })).toBeFalsy();
      expect(isFunction([1, 2])).toBeFalsy();
      expect(isFunction(1)).toBeFalsy();
      expect(isFunction('Hi')).toBeFalsy();
      expect(isFunction(true)).toBeFalsy;
    });

  });

  describe('casters', () => {
    it('can cast values to a number', () => {
      expect(castToNumber(3)).toEqual(3);
      expect(castToNumber('3')).toEqual(3);
      expect(castToNumber(true)).toEqual(1);
      expect(castToNumber(false)).toEqual(0);
    });

    it('throws if value is not castable to number', () => {
      expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
    });

    it('can cast values to a string', () => {
      expect(castToString('hi')).toEqual('hi');
      expect(castToString(3)).toEqual('3');
      expect(castToString(true)).toEqual('true');
      expect(castToString(false)).toEqual('false');
      expect(castToString([1, 2])).toEqual('1,2');
      expect(castToString([])).toEqual('');
      expect(castToString('')).toEqual('');
      expect(castToString({})).toEqual('[object Object]');
      expect(castToString(undefined)).toEqual('undefined');
    });

    it('can cast values to a boolean', () => {
      expect(castToBoolean(true)).toEqual(true);
      expect(castToBoolean(false)).toEqual(false);
      expect(castToBoolean('true')).toEqual(true);
      expect(castToBoolean('false')).toEqual(false);
      expect(castToBoolean('True')).toEqual(true);
      expect(castToBoolean('False')).toEqual(false);
      expect(castToBoolean('TRUE')).toEqual(true);
      expect(castToBoolean('FALSE')).toEqual(false);
      expect(castToBoolean('t')).toEqual(true);
      expect(castToBoolean('f')).toEqual(false);
      expect(castToBoolean('T')).toEqual(true);
      expect(castToBoolean('F')).toEqual(false);
      expect(castToBoolean(1)).toEqual(true);
      expect(castToBoolean(0)).toEqual(false);
    });

    it('throws if value is not castable to boolean', () => {
      expect(() => castToBoolean('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean(3)).toThrowErrorMatchingSnapshot();
    });

    it('can cast values to an array', () => {
      expect(castToArray([1, 2, 3])).toEqual([1, 2, 3]);
      expect(castToArray([])).toEqual([]);
      expect(castToArray('hi')).toEqual(['h', 'i']);
      expect(castToArray(123)).toEqual(['1', '2', '3']);
      expect(castToArray({ me:1, you:2 })).toEqual([{ me:1 }, { you:2 }]);
      
    });

  });

  it('can get the right caster', () => {
    expect(getCaster(Number)).toEqual(castToNumber);
    expect(getCaster(String)).toEqual(castToString);
    expect(getCaster(Boolean)).toEqual(castToBoolean);
    expect(getCaster(Array)).toEqual(castToArray);
    expect(getCaster(Promise)).toBeNull();
  });
});
