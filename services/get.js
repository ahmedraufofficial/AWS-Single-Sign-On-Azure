const qs = require('qs');
const axios = require('axios');
const request = require('request');
const util = require('util');
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const getToken = (endpoint, credentials) => {
    return new Promise((resolve, reject) => {
        axios.post(endpoint, qs.stringify(credentials))
        .then(response => {
            resolve(response.data?.access_token)
        })
        .catch(error => {
            reject(error);
        })
    })
}

const getServicePrincipal = (appId, token) => {
    const options = {
        'method': 'GET',
        'url': `https://graph.microsoft.com/v1.0/servicePrincipals?$count=true&$search="appId:${appId}"`,
        'headers': {
          'Authorization': `Bearer ${token}`,
          'ConsistencyLevel': 'eventual'
        },
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

const getApplication = (appName, token) => {
    const options = {
        'method': 'GET',
        'url': `https://graph.microsoft.com/v1.0/applications?$count=true&$search="displayName:${appName}"`,
        'headers': {
          'Authorization': `Bearer ${token}`,
          'ConsistencyLevel': 'eventual'
        },
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

const getJobId = (servicePrincipalId, token) => {
    const options = {
        'method': 'GET',
        'url': `https://graph.microsoft.com/beta/servicePrincipals/${servicePrincipalId}/synchronization/jobs`,
        'headers': {
          'Authorization': `Bearer ${token}`,
          'ConsistencyLevel': 'eventual'
        },
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

exports.getJobId = getJobId;
exports.getApplication = getApplication;
exports.getServicePrincipal = getServicePrincipal;
exports.getToken = getToken;