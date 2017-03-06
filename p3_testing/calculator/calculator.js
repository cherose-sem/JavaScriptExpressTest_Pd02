
var sum = function(n1,n2){
    return n1 + n2;
}

var subtract = function(n1,n2){
    return n1 - n2;
}

var multiply = function(n1,n2){
    return n1 * n2;
}

var divide = function(n1, n2){
    if(n2 === 0)
    {
    throw new Error("Divied by zero");
    }
    else
    return n1 / n2;
}

module.exports = {sum,subtract,multiply,divide};