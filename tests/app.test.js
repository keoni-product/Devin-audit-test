const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
  test('GET /api/users should return users', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect(200);
    
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/notify should handle notification', async () => {
    const taskData = {
      text: 'Test task',
      assignee: { name: 'Test User', phone: '+15555550101' }
    };

    const response = await request(app)
      .post('/api/notify')
      .send(taskData)
      .expect(200);
  });
});
