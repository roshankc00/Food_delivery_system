import { ping } from 'tcp-ping';
describe('Health', () => {
  test('AuthHttp', async () => {
    const response = await fetch('http://localhost:4000');
    console.log(response.json());
    expect(response.ok).toBeTruthy();
  });
  test('AuthTcp', (done) => {
    ping({ address: 'localhost', port: 3001 }, (err) => {
      if (err) {
        fail();
      } else {
        done();
      }
    });
  });
  //   food
  test('foodhttp', async () => {
    const response = await fetch('http://localhost:3002');
    expect(response.ok).toBeTruthy();
  });

  test('foodTcp', (done) => {
    ping({ address: 'localhost', port: 3003 }, (err) => {
      if (err) {
        fail();
      } else {
        done();
      }
    });
  });

  // notification
  test('Notification', (done) => {
    ping({ address: 'localhost', port: 3004 }, (err) => {
      if (err) {
        fail();
      } else {
        done();
      }
    });
  });

  //orders

  test('Order', async () => {
    const response = await fetch('http://localhost:3008');
    expect(response.ok).toBeTruthy();
  });

  // payment
  test('Notification', (done) => {
    ping({ address: 'localhost', port: 3007 }, (err) => {
      if (err) {
        fail();
      } else {
        done();
      }
    });
  });
});
