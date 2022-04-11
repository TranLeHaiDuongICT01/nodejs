const names = require('./4-names');
const sayHi = require('./5-utils');
const data = require('./6-alternative');
const add = require('./7-mind');
console.log(data);

Object.keys(names).forEach(name=>{
    console.log(names[name]);
})