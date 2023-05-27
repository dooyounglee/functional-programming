_.push_arguments = function(arg1, arg2) {
    var len = arg1.length;
    var index_arg2 = 0;
    for (var i=0; i<arg1.length; i++) {
        if (arg1[i] == _) arg1[i] = arg2.length > index_arg2 ? arg2[index_arg2++] : undefined;
    }
    arg1.length = len + arg2.length - index_arg2;
    for (var i=index_arg2; i<arg2.length; i++) {
        arg1[len++] = arg2[i];
    }
    return arg1;
}

_.partial = function() {
    var partial_arguments = arguments;
    return function() {
        return partial_arguments[0].apply(null, _.push_arguments(_.rest(partial_arguments), arguments));
    }
}