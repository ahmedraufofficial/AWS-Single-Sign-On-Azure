const request = require('request');

const postApp = (appId, appName, token) => {
    const options = {
        'method': 'POST',
        'url': `https://graph.microsoft.com/v1.0/applicationTemplates/${appId}/instantiate`,
        'headers': {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "displayName": appName
          })  
    };

    return new Promise((resolve, reject) => {
        request(options, function(error, res, body) {
            if (!error && res.statusCode === 201) {
                resolve(body);
            } else {
                reject(error);
            }
        })
    })
}

const postClaimingPolicy = (token) => {
    const options = {
        'method': 'POST',
        'url': 'https://graph.microsoft.com/v1.0/policies/claimsMappingPolicies',
        'headers': {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "definition": [
                "{\"ClaimsMappingPolicy\":{\"Version\":1,\"IncludeBasicClaimSet\":\"true\", \"ClaimsSchema\": [{\"Source\":\"user\",\"ID\":\"assignedroles\",\"SamlClaimType\": \"https://aws.amazon.com/SAML/Attributes/Role\"}, {\"Source\":\"user\",\"ID\":\"userprincipalname\",\"SamlClaimType\": \"https://aws.amazon.com/SAML/Attributes/RoleSessionName\"}, {\"Value\":\"900\",\"SamlClaimType\": \"https://aws.amazon.com/SAML/Attributes/SessionDuration\"}, {\"Source\":\"user\",\"ID\":\"assignedroles\",\"SamlClaimType\": \"appRoles\"}, {\"Source\":\"user\",\"ID\":\"userprincipalname\",\"SamlClaimType\": \"https://aws.amazon.com/SAML/Attributes/nameidentifier\"}]}}"
            ],
            "displayName": "AWS Claims Policy",
            "isOrganizationDefault": false   
        })  
    };

    return new Promise((resolve, reject) => {
        request(options, function(error, res, body) {
            if (!error && res.statusCode === 201) {
                resolve(body);
            } else {
                reject(error);
            }
        })
    })
}

const postServingPrinciplePolicy = (servicePrincipalId, claimingMapPolicyId, token) => {
    const options = {
        'method': 'POST',
        'url': `https://graph.microsoft.com/v1.0/servicePrincipals/${servicePrincipalId}/claimsMappingPolicies/$ref`,
        'headers': {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "@odata.id":`https://graph.microsoft.com/v1.0/policies/claimsMappingPolicies/${claimingMapPolicyId}`
          })  
    };

    return new Promise((resolve, reject) => {
        request(options, function(error, res, body) {
            if (!error && res.statusCode === 204) {
                resolve(body);
            } else {
                reject(error);
            }
        })
    })
}

const postCertificate = (servicePrincipalId, certificateName, token) => {
    const currentDate = new Date(); 
    const nextYear = currentDate.getFullYear() + 1;
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const nextYearSameDay = new Date(nextYear, currentMonth, currentDay);
    const expiryDate = nextYearSameDay.toISOString().slice(0, -5) + "Z";

    const options = {
        'method': 'POST',
        'url': `https://graph.microsoft.com/v1.0/servicePrincipals/${servicePrincipalId}/addTokenSigningCertificate`,
        'headers': {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "displayName": `CN=AWS ${certificateName}`,
            "endDateTime": expiryDate
        })  
    };

    return new Promise((resolve, reject) => {
        request(options, function(error, res, body) {
            if (!error && res.statusCode === 200) {
                resolve(body);
            } else {
                reject(error);
            }
        })
    })
}

const postTemplate = (servicePrincipalId, token) => {
    const options = {
        'method': 'POST',
        'url': `https://graph.microsoft.com/beta/servicePrincipals//${servicePrincipalId}/synchronization/jobs`,
        'headers': {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            "templateId": "aws"
        })  
    };

    return new Promise((resolve, reject) => {
        request(options, function(error, res, body) {
            if (!error && res.statusCode === 201) {
                resolve(body);
            } else {
                resolve(null);
            }
        })
    })
}

const postValidateCredentials = (servicePrincipalId, jobId, accessKey, secretKey, token) => {
    const options = {
        'method': 'POST',
        'url': `https://graph.microsoft.com/beta/servicePrincipals/${servicePrincipalId}/synchronization/jobs/${jobId}/validateCredentials`,
        'headers': {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "credentials": [
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
                resolve(body);
            } else {
                reject(error);
            }
        })
    })
}

const postProvisionStart = (servicePrincipalId, jobId, accessKey, secretKey, token) => {
    const options = {
        'method': 'POST',
        'url': `https://graph.microsoft.com/beta/servicePrincipals/${servicePrincipalId}/synchronization/jobs/${jobId}/start`,
        'headers': {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        } 
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

exports.postProvisionStart = postProvisionStart;
exports.postValidateCredentials = postValidateCredentials;
exports.postTemplate = postTemplate;
exports.postCertificate = postCertificate;
exports.postServingPrinciplePolicy = postServingPrinciplePolicy;
exports.postClaimingPolicy = postClaimingPolicy;
exports.postApp = postApp;