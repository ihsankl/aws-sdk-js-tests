const AWS = require("aws-sdk");

const {
  fromCognitoIdentityPool
} = require("@aws-sdk/credential-provider-cognito-identity");
const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
const { S3 } = require("@aws-sdk/client-s3");

const { REGION, IDENTITY_POOL_ID } = require("./config");

const params = {
  Bucket: "js-sdk-test-bucket",
  Key: "file with space.txt",
  Body: "abc"
};

const getV2Response = async clientParams => {
  const client = new AWS.S3(clientParams);
  return client.putObject(params).promise();
};

const getV3Response = async clientParams => {
  const client = new S3(clientParams);
  return client.putObject(params);
};

const getV2BrowserResponse = async () => {
  // Initialize the Amazon Cognito credentials provider
  AWS.config.region = REGION;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID
  });

  return getV2Response({ region: REGION });
};

const getV3BrowserResponse = async () =>
  getV3Response({
    region: REGION,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({
        region: REGION
      }),
      identityPoolId: IDENTITY_POOL_ID
    })
  });

module.exports = {
  getV2Response,
  getV3Response,
  getV2BrowserResponse,
  getV3BrowserResponse
};
