const isNumber = val => typeof val === 'number';
const isString = val => typeof val === 'string';
const isBoolean = val => typeof val === 'boolean';
const isArray = val => Array.isArray(val);
const isObject = val => val instanceof Object;
const isFunction = val => val instanceof Function;

const castToNumber = val => {
  if(isNumber(val)) return val;
  const number = Number(val);
  if(isNaN(number)) throw new CastError(Number, val);
  return number;
};

const castToString = val => {
  if(typeof val === 'string'){
    return val;
  }
  else return `${val}`;
};

const castToBoolean = val => {  
  const acceptedTrueBools = [true, 'true', 'True', 'TRUE', 'T', 't', 1];
  const acceptedFalseBools = [false, 'false', 'False', 'FALSE', 'F', 'f', 0];
  if(acceptedTrueBools.includes(val)){
    return true;
  }
  else if(acceptedFalseBools.includes(val)){
    return false;
  }
  else throw new CastError(Boolean, val);
};

const castToArray = val => {
  if(Array.isArray(val)) return val;
  else if(isObject(val)){
    return Object.keys(val).map(function(key) {
      return [key, val[key]];
    });
  }
  else return Array.from(castToString(val));
};

class CastError extends Error {
  constructor(Type, value) {
    const type = Type.name;
    super(`Cannot cast >>${value}<< to ${type}`);
    this.type = type;
    this.value = value;
  }
}

const casters = {
  Number: castToNumber,
  String: castToString,
  Boolean: castToBoolean,
  Array: castToArray
};

const getCaster = Type => {  
  return casters[Type.name] || null;
};

module.exports = {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  CastError,
  getCaster,
  castToNumber,
  castToString,
  castToBoolean,
  castToArray
};
