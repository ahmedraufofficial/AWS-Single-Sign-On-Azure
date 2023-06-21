const request = require('request');

const patchServicePrincipal = (servicePrincipalId, token) => {
    const options = {
        'method': 'PATCH',
        'url': `https://graph.microsoft.com/v1.0/servicePrincipals/${servicePrincipalId}`,
        'headers': {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "preferredSingleSignOnMode": "saml"
        })
      };
    return new Promise((resolve, reject) => {
        request(options, function (error, res, body) {
            if (!error && res.statusCode === 204) {
                resolve(`Successfully Updated App for SAML`);
            } else {
                console.log(body)
                reject(error);
            }
        });
    })
}

const patchApplication = (id, accountId, token) => {
  const options = {
      'method': 'PATCH',
      'url': `https://graph.microsoft.com/v1.0/applications/${id}`,
      'headers': {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "identifierUris": [
            `https://signin.aws.amazon.com/saml#${accountId}`
          ]    
        })
    };
  return new Promise((resolve, reject) => {
      request(options, function (error, res, body) {
          if (!error && res.statusCode === 204) {
              resolve(`Successfully Updated App URI`);
          } else {
            console.log(body)
              reject(error);
          }
      });
  })
}

exports.patchApplication = patchApplication;
exports.patchServicePrincipal = patchServicePrincipal;