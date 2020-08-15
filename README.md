# aws-sdk-js-tests

Code Sample for testing AWS JS SDK

## Steps to test:

- Fork this repo, and clone your fork
- Create a local branch in your workspace
- Update the code for testing AWS JS SDK v2/v3
  - The SDK clients are created and API calls are made in [`src/shared/utils.js`](./src/shared/utils.js)
- Push code to remote branch on your fork, and share the code for reproducing the issue

## Pre-requisites

- Update REGION in [`src/shared/config.js`](./src/shared/config.js)
- For browser and react-native, IDENTITY_POOL_ID also needs to be updated
  - [Create a Amazon Cognito Identity pool for testing](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-browser.html#getting-started-browser-create-identity-pool)
    - Note down IDENTITY_POOL_ID
  - [Add a Policy to the test Unauthenticated IAM Role](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-browser.html#getting-started-browser-iam-role)
    - The policy should be specific to the operations you want to test
  - Update the IDENTITY_POOL_ID in [`src/shared/config.js`](./src/shared/config.js)

## Validate Pintpoint client:

- Checkout master branch: `git checkout retry-headers-cors`
- Run `yarn` to install dependencies

### Browser:

- Run `yarn start:browser` to start webpack-dev-server with HMR
- The bundle will be opened in default browser, and get refreshed when code is updated.
- The file being run is at [`src/browser/index.js`](./src/browser/index.js)
- Open browser's dev tool and find the error shown in the console:
  ```
  Access to fetch at ... has been blocked by CORS policy: Request header field
  amz-sdk-invocation-id is not allowed by Access-Control-Allow-Headers in preflight response.
  ```
- Open [`src/browser/index.js`](./src/browser/index.js) and uncomment the highlighted
  code scope and refresh the page. It will show the expected behavior if the issue
  is fixed from server-side.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.
