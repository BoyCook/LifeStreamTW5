/*
 Github client
 */
var request = require('request');

function GitHub() {
    this.baseUrl = 'https://api.github.com';
    this.repos = [];
    this.gists = [];
    this.events = [];
}

GitHub.prototype.getUsersRepos = function (user, error, success) {
    var path = '/users/' + user + '/repos';
    var url = this.baseUrl + path;
    this.doRequest(url, error, success, 'repos');
};

GitHub.prototype.getUsersGists = function (user, error, success) {
    var path = '/users/' + user + '/gists';
    var url = this.baseUrl + path;
    this.doRequest(url, error, success, 'gists');
};

GitHub.prototype.getUsersEvents = function (user, error, success) {
    var path = '/users/' + user + '/events';
    var url = this.baseUrl + path;
    this.doRequest(url, error, success, 'events');
};

GitHub.prototype.doRequest = function (url, error, success, field) {
    var context = this;
    request(url, function (err, response, body) {
        console.log('URL [%s]', url);
        if (!err && response.statusCode == 200) {
            var data = context.parseJSON(body);
            if (field) {
                context[field] = data;
            }
            if (success) {
                success(data);
            }
        } else {
            if (error) {
                error(err, response, body);
            }
        }
    })
};

GitHub.prototype.parseJSON = function (data) {
    var json = undefined;
    try {
        json = JSON.parse(data);
    } catch (ex) {
        console.log('Error parsing JSON [%s]', ex);
    }
    return json;
};

if (!(typeof exports === 'undefined')) {
    exports.GitHub = GitHub;
}
