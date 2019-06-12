[![Known Vulnerabilities](https://snyk.io/test/github/andreas-straub/lambda-nodejs-typescript/badge.svg?targetFile=package.json)](https://snyk.io/test/github/andreas-straub/lambda-nodejs-typescript?targetFile=package.json)

## Serverless AWS Lambda, Nodejs and TypeScript Boilerplate

This project contains boilerplate code for projects based on AWS lambda functions with Nodejs runtime and TypeScript.

## Includes:

- TypeScript language for development
- Nodejs Runtime
- Serverless Framework
- Offline Lambda execution
- Unit Tests with Mocha and Mochawesome Reporter
- Preconfigured Logger
- Preconfigured Prettier
- Preconfigured Linter
- Webpack
- Template for AWS Codepipline `buildspec.yml`

## Invoking a single handler locally

Run `serverless invoke local -f [functionName]`.

## Run API locally

In order to run your serverless lambdas locally, just start them with `sls offline`
(see: [https://github.com/dherault/serverless-offline](https://github.com/dherault/serverless-offline)).

### After start:

- Visit [http://localhost:3000/] to list the available routes.

## Contact

**Developer Andreas Straub**

```
Email: kontakt@andreas-straub.biz
Telefon: +49 40 882159 40
```

## License

Copyright 2019 Andreas Straub

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
