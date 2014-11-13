#index-finger

*create indexes for your modules*

[![Build Status](https://travis-ci.org/TheAlphaNerd/index-finger.svg?branch=master)](https://travis-ci.org/TheAlphaNerd/index-finger)  [![Dependency Status](https://david-dm.org/TheAlphaNerd/index-finger.svg)](https://david-dm.org/TheAlphaNerd/index-finger)  [![devDependency Status](https://david-dm.org/TheAlphaNerd/index-finger/dev-status.svg)](https://david-dm.org/TheAlphaNerd/index-finger#info=devDependencies)

##who is this for?

Do you ever find yourself creating modules where the index has almost no content aside from exporting all of the other modules in the folder?  If so this tool is for you!  index-finger will parse across your module and generate index files for you in each of your folders.

**WARNING**  index-finger will overwrite ANY index files you have in your project.  If you are not using version control you could end up a very very sad panda **WARNING**

##example

Lets say you have a project that looks something like this
```
.
├── a.js
├── b.js
├── c.js
```

index-finger will parse through the above provided folder and generate an ```index.js``` that looks like this

```js
module.exports = {
  a: require('./a'),
  b: require('./b'),
  c: require('./c')
};
```

##install

with [npm][npm] do:

```bash
npm install -g index-finger
```

##usage

```index-finger [path to entry] {OPTIONS}```

Standard Options:

-o Directory to write to other than source directory
-h Show this message

##methods

index-finger can also be used programatically

```
var indexFinger = require('index-finger');
```

###indexFinger(src, output (optional), cb)

where ```src``` is the src folder to parse, ```ourput``` is an optional directory to output to, and ```cb(err)``` is a callback function called once the files are done being written.

If ```ouput``` is provided index-finger will copy the entire project to the output directory prior to parsing.

##license

MPL V2

[npm]: http://npmjs.org