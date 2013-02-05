/*
 Wordpress javascript client
 */

var OAuth = require('oauth').OAuth;
var qs = require('qs');

function WordPress(config) {
    this.consumerKey = config.consumerKey;
    this.consumerSecret = config.consumerSecret;
    this.accessToken = config.accessToken;
    this.accessTokenSecret = config.accessTokenSecret;
    this.callBackUrl = config.callBackUrl;
    this.baseUrl = 'https://public-api.wordpress.com/rest/v1';
    this.oauth = new OAuth(
        'https://public-api.wordpress.com/oauth2/token',
        'https://public-api.wordpress.com/oauth2/authorize',
        this.consumerKey,
        this.consumerSecret,
        '1.0',
        this.callBackUrl,
        'HMAC-SHA1'
    );
}

WordPress.prototype.getPosts = function (site, params, error, success) {
    var path = '/sites/' + site + '/posts/' + this.buildQS(params);
    var url = this.baseUrl + path;
    this.doRequest(url, error, success);
};

WordPress.prototype.getPost = function (site, id, params, error, success) {
    var path = '/sites/' + site + '/posts/' + id + this.buildQS(params);
    var url = this.baseUrl + path;
    this.doRequest(url, error, success);
};

WordPress.prototype.doRequest = function (url, error, success) {
    this.oauth.get(url, this.accessToken, this.accessTokenSecret, function (err, body, response) {
        console.log('URL [%s]', url);
        if (!err && response.statusCode == 200) {
            success(JSON.parse(body));
        } else {
            error(response.statusCode, body);
        }
    });
};

WordPress.prototype.buildQS = function (params) {
    if (params && Object.keys(params).length > 0) {
        return '?' + qs.stringify(params);
    }
    return '';
};

if (!(typeof exports === 'undefined')) {
    exports.WordPress = WordPress;
}
