const {getToken, getServicePrincipal, getApplication, getJobId} = require('../services/get');  
const {postApp, postClaimingPolicy, postServingPrinciplePolicy, postCertificate, postTemplate, postValidateCredentials, postProvisionStart} = require('../services/post');
const {patchServicePrincipal, patchApplication} = require('../services/patch');
const {putValidateCredentials} = require('../services/put');

module.exports = async function (context, req) {
    if (req.body.validation == true) {
        context.res = {
            body: {
                "message": "Running"
            }
        };
    } else {
        const APP_ID = 'Registered MS app ID';
        const APP_SECERET = 'Registerd MS app Secret';
        const TOKEN_ENDPOINT ='https://login.microsoftonline.com/{tenant Id}/oauth2/v2.0/token';
        const MS_GRAPH_SCOPE = 'https://graph.microsoft.com/.default';
        const postData = {
        client_id: APP_ID,
        scope: MS_GRAPH_SCOPE,
        client_secret: APP_SECERET,
        grant_type: 'client_credentials'
        };
        const APPLICATION_TEMPLATE = '8b1025e4-1dd2-430b-a150-2ef79cd700f5'
        const APP_NAME = `AWS ${req.body.appName} Reseller Account`
        const ACCOUNT_ID = req.body.accountId

        const token = await getToken(TOKEN_ENDPOINT, postData) 

        if (req.body.provision) {
            context.log("Started provisioning")
            const provision = req.body.provision
            const template = JSON.parse(await postTemplate(provision.servicePrincipal, token));
            var templateId = ""
            if (!template) {
                context.log("Job Id already exists")
                const readyTemplate = JSON.parse(await getJobId(provision.servicePrincipal, token))
                templateId = readyTemplate.value[0].id
            } else {
                templateId = template.id
            }
            context.log(`Job Id to be provisioned: ${templateId}`)
            const validateCredentials = await postValidateCredentials(provision.servicePrincipal, templateId, provision.accessKey, provision.secretKey, token)
            const uploadCredentials = await putValidateCredentials(provision.servicePrincipal, provision.accessKey, provision.secretKey, token)
            if (uploadCredentials) {
                context.log('Credentials validated. Started provisioning job')
                const startProvisioning = await postProvisionStart(provision.servicePrincipal, templateId, provision.accessKey, provision.secretKey, token)
                startProvisioning ? context.res = {
                    body: {
                        template: templateId,
                        msg: "Successfully Provisioned."
                    }
                } : context.res = {
                    body: {
                        template: templateId,
                        msg: "Provisioning Failed."
                    }
                }
            } else {
                context.res = {
                    body: {
                        template: templateId,
                        msg: "Provisioning Failed."
                    }
                }
            }
        } else {
            const existingApplication = JSON.parse(await getApplication(APP_NAME, token))
            if (parseInt(existingApplication["@odata.count"]) > 0) {    
                const existingServicePrincipal = JSON.parse(await getServicePrincipal(existingApplication.value[0].appId, token));           
                context.res = {
                    body: {
                        servicePrincipalId: existingServicePrincipal.value[0].id,
                        appId: existingApplication.value[0].appId,
                        instatiateId: existingApplication.value[0].id,
                        token: token,
                        msg: "Account already exists."
                    }
                }
            } else {
            const instatiate = JSON.parse(await postApp(APPLICATION_TEMPLATE, APP_NAME, token))
            const instatiateId = instatiate.application.id
            const appId = instatiate.application.appId
            const servicePrincipalId = instatiate.servicePrincipal.id

            await new Promise((resolve) => setTimeout(resolve, 20000));

            try {
                await patchServicePrincipal(servicePrincipalId, token);
                context.log('patchServicePrincipal completed successfully.');
            } catch (error) {
                console.error('Retrying Patch:', error);
                await new Promise((resolve) => setTimeout(resolve, 10000));
                await patchServicePrincipal(servicePrincipalId, token);
                context.log('Retried patchServicePrincipal completed successfully.');
            }

            try {
                await patchApplication(instatiateId, ACCOUNT_ID, token);
                context.log('patchApplication completed successfully.');
            
                const claimingPolicyId = JSON.parse(await postClaimingPolicy(token)).id

                await postServingPrinciplePolicy(servicePrincipalId, claimingPolicyId, token);
                context.log('postServingPrinciplePolicy completed successfully.');
            
                await postCertificate(servicePrincipalId, req.body.appName, token);
                context.log('postCertificate completed successfully.');
            } catch (error) {
                context.error('An error occurred:', error);
            }

            context.res = {
                body: {
                    servicePrincipalId: servicePrincipalId,
                    appId: appId,
                    instatiateId: instatiateId,
                    token: token,
                    msg: "Account created."
                }
            };
        }
    }
    }
}
