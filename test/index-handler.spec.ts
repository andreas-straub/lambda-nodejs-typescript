import { describe } from 'mocha';
import * as ServerlessInvoker from 'serverless-http-invoker';
import { expect } from 'chai';

describe('newsletter-get-handler', () => {
  const serverlessInvoker = new ServerlessInvoker();

  it('should return "Hello World"', async () => {
    const response = await serverlessInvoker.invoke('GET /');
    const expectedBody = 'Hello World';
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.equal(expectedBody);
  });
});
