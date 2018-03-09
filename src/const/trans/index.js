const lang = require('../../config').lang;

module.exports = function () {
    let _trans = require('./' + lang);
    let _args = [
        ...arguments
    ];
    for (let i = 0; i < _args.length; i++) {
        if (_trans[_args[i]]) {
            if (!Array.isArray(_trans[_args[i]]) && typeof _trans[_args[i]] === 'object') {
                _trans = _trans[_args[i]];
            } else {
                return _trans[_args[i]];
            }
        } else {
            return '[' + _args.join('.') + ']';
        }
    }
};