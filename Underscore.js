var _ = {};
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

function getLength(list) {
    return list == null ? 0 : list.length;
}

var isArrayLike = function(list) {
    var length = getLength(list);
    return typeof length == 'number' && length <= MAX_ARRAY_INDEX;
}

_.map = function(data, iteratee) {
    var new_list = [];
    if (isArrayLike(data)) {
        for (var i=0; i<data.length; i++) {
            new_list.push(iteratee(data[i],i,data));
        }
        return new_list;
    } else {
        for (var key in data) {
            if (data.hasOwnProperty(key)) new_list.push(iteratee(data[key], key, data));
        }
        return new_list;
    }
}

_.identity = function(v) {
    return v;
}

_.values = function(list) {
    return _.map(list, _.identity);
}

_.toArray = function(list) {
    return Array.isArray(list) ? list : _.values(list);
}

_.rest = function(list, num) {
    return _.toArray(list).slice(num || 1);
}

_.is_object = function(obj) {
    return typeof obj == 'object' && !!obj;
}

_.keys = function(obj) {
    return _.is_object(obj) ? Object.keys(obj) : [];
}

_.each = function(list, iter) {
    var keys = _.keys(list);
    for (var i = 0, len = keys.length; i < len; i++) {
      iter(list[keys[i]], keys[i]);
    }
}

_.reduce = function(list, iter, memo) {
    if (arguments.length == 2) {
      memo = list[0];
      list = _.rest(list);
    }
    _.each(list, function(val) {
      memo = iter(memo, val);
    });
    return memo;
}