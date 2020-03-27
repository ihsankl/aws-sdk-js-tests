const AWS = require("aws-sdk");
const {
  fromCognitoIdentityPool
} = require("@aws-sdk/credential-provider-cognito-identity");
const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
const { Rekognition } = require("@aws-sdk/client-rekognition");

const { REGION, IDENTITY_POOL_ID } = require("./config");

const bucket = "js-sdk-test-bucket";

const getV2Response = async (clientParams, commandParams) => {
  const client = new AWS.Rekognition(clientParams);
  return client.recognizeCelebrities(commandParams).promise();
};

const getV3Response = async (clientParams, commandParams) => {
  const client = new Rekognition({
    ...clientParams
  });
  return client.recognizeCelebrities(commandParams);
};

const getV2BrowserResponse = async params => {
  // Initialize the Amazon Cognito credentials provider
  AWS.config.region = REGION;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID
  });
  return getV2Response({ region: REGION }, params);
};

const getV3BrowserResponse = async params =>
  getV3Response(
    {
      region: REGION,
      credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({
          region: REGION
        }),
        identityPoolId: IDENTITY_POOL_ID
      })
    },
    params
  );

module.exports = {
  getV2Response,
  getV3Response,
  getV2BrowserResponse,
  getV3BrowserResponse
};
