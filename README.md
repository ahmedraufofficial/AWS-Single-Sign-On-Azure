# Pipeline Process 2 for AWS Single Sign on Access from Azure

This pipeline process utilizes the Graph API and is designed for [AWS SSO to AZURE Pipeline setup](https://github.com/ahmedraufofficial/AWS-Single-Sign-On-Azure-Pipeline). It consists of the following steps:

## Step 1: Check Application Existence

- The pipeline checks if the application already exists.

## Step 2a: Application Existence

- If the application exists, the pipeline proceeds to the next step.

## Step 2b: Application Creation and Configuration

- If the application doesn't exist, the following actions are performed within the function:
  - Enterprise App creation
  - SAML permission assignment to service principal
  - Identifier URI value assignment to application
  - Claiming policy creation
  - Claiming policy assignment to service principal
  - Certificate assignment to service principal

## Usage

To implement this pipeline process, follow these steps:
- Deploy this function to Azure Functions Consumption plan

### Related Documentations
> - [Use Microsoft Graph APIs to configure SAML-based single sign-on - Microsoft Graph](https://docs.microsoft.com/en-us/graph/api/resources/saml-single-sign-on)
> - [Configure provisioning using Microsoft Graph APIs - Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/application-provisioning-configuration-api)
