const { isNumber, isString, isBoolean, isArray, isObject, isFunction, CastError, getCaster, castToNumber, castToString, castToBoolean, castToArray } = require('./lib/types.js');

console.log(isNumber(3));
console.log(isString('3'));
console.log(isBoolean(true));
console.log(isArray([1, 2]));
console.log(isObject({ 'me':1, 'you':2 }));
console.log(isFunction(() => {}));

