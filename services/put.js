const request = require('request');

const putValidateCredentials = (servicePrincipalId, accessKey, secretKey, token) => {
    const options = {
        'method': 'PUT',
        'url': `https://graph.microsoft.com/beta/servicePrincipals/${servicePrincipalId}/synchronization/secrets`,
        'headers': {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "value": [
                {
                    "key": "ClientSecret",
                    "value": accessKey
                },
                {
                    "key": "SecretToken",
                    "value": secretKey
                }
            ]
        })  
    };

    return new Promise((resolve, reject) => {
        request(options, function(error, res, body) {
            if (!error && res.statusCode === 204) {
                resolve(true);
            } else {
                reject(error);
            }
        })
    })
}

exports.putValidateCredentials = putValidateCredentials;