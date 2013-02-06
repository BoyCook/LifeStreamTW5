/*
    Jenkins client
 */

var request = require('request');

function Jenkins(config) {
    this.baseUrl = config.baseUrl;
}

Jenkins.prototype.getCore = function(error, success) {
    this.get('/', error, success);
};

Jenkins.prototype.getQueue = function(error, success) {
    this.get('/queue', error, success);
};

Jenkins.prototype.getLoad = function(error, success) {
    this.get('/overallLoad', error, success);
};

Jenkins.prototype.get = function(path, error, success) {
    var url = this.baseUrl + path + '/api/json';
    this.doRequest(url, error, success);
};

Jenkins.prototype.doRequest = function (url, error, success) {
    request(url, function (err, response, body) {
        console.log('URL [%s]', url);
        if (!err && response.statusCode == 200) {
            success(JSON.parse(body));
        } else {
            error(response.statusCode, body);
        }
    })
};

if (!(typeof exports === 'undefined')) {
    exports.Jenkins = Jenkins;
}
