## Description
A Jenkins client written in Javascript

## Usage

    var error = function (err, response, body) {
        console.log('ERROR [%s]', err);
    };

    var success = function (data) {
        console.log('SUCCESS [%s]', data);
    };

    var jenkins = new Jenkins({baseUrl: 'http://mydomina.com/jenkins'});
    jenkins.getCore(error, success);
    jenkins.getQueue(error, success);
    jenkins.getLoad(error, success);
