const AWS = require("aws-sdk");
const PinpointV2Client = require("aws-sdk/clients/pinpoint");

const {
  fromCognitoIdentityPool,
} = require("@aws-sdk/credential-provider-cognito-identity");
const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
const { Pinpoint } = require("@aws-sdk/client-pinpoint");

const { REGION, IDENTITY_POOL_ID } = require("./config");

const getV2Response = async (clientParams) => {
  const client = new PinpointV2Client(clientParams);
  return client.getApps().promise();
};

const getV3Response = async (clientParams) => {
  const client = new Pinpoint(clientParams);

  /***Comment out this block to workaround the CORS issue on client side */
  // client.middlewareStack.addRelativeTo(
  //   (next) => (args) => {
  //     delete args.request.headers["amz-sdk-invocation-id"];
  //     delete args.request.headers["amz-sdk-request"];
  //     return next(args);
  //   },
  //   {
  //     step: "finalizeRequest",
  //     relation: "after",
  //     toMiddleware: "retryMiddleware",
  //   }
  // );

  return client.getApps({});
};

const getV2BrowserResponse = async () => {
  // Initialize the Amazon Cognito credentials provider
  AWS.config.region = REGION;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID,
  });

  return getV2Response({ region: REGION });
};

const getV3BrowserResponse = async () =>
  getV3Response({
    region: REGION,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({
        region: REGION,
      }),
      identityPoolId: IDENTITY_POOL_ID,
    }),
  });

module.exports = {
  getV2Response,
  getV3Response,
  getV2BrowserResponse,
  getV3BrowserResponse,
};
