const isNumber = val => typeof val === 'number';
const isString = val => typeof val === 'string';
const isBoolean = val => typeof val === 'boolean';
const isArray = () => {};
const isObject = () => {};
const isFunction = () => {};

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
const castToBoolean = () => {};
const castToArray = () => {};

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
