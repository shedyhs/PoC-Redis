import { HealthCheckController } from './health-check-controller';

describe('ShowAddressController', () => {
  let sut: HealthCheckController;

  beforeEach(async () => {
    sut = new HealthCheckController();
  });

  it('Should be able to perform ShowAddressController and return status 200 with address entity', async () => {
    const result = await sut.handle({
      body: {},
      params: {},
      query: {},
      headers: {},
      file: {},
      method: {},
      url: {},
      user: {},
    });
    expect(result.statusCode).toBe(200);
    expect(result.data).toBeUndefined();
  });
});
