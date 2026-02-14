// tests/finacAPI2.spec.js
const { test, expect, request } = require('@playwright/test');

test.describe('Reqres API Automation', () => {
  let apiContext;
  
  test.beforeAll(async () => {
    // Create a request context for the API
    apiContext = await request.newContext({
      baseURL: 'https://reqres.in/api',
    });
  });

  test('Create user and validate response', async () => {
    const userPayload = {
      name: 'Abhiram',
      job: 'QA Engineer'
    };

    const response = await apiContext.post('/users', { data: userPayload });
    
    // Validate status code
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    console.log('Create User Response:', responseBody);

    // Validate response body
    expect(responseBody.name).toBe(userPayload.name);
    expect(responseBody.job).toBe(userPayload.job);

    // Store id for logging purpose (cannot use for GET/PUT on Reqres)
    const userId = responseBody.id;
    console.log('Created user id:', userId);
  });

  test('Update user and validate response', async () => {
    const updatedPayload = {
      name: 'Abhiram Gunji',
      job: 'Senior QA Engineer'
    };

    // Use a fixed ID because Reqres does not persist users
    const response = await apiContext.put('/users/2', { data: updatedPayload });

    expect(response.status()).toBe(200);

    const updatedData = await response.json();
    console.log('Updated User Response:', updatedData);

    expect(updatedData.name).toBe(updatedPayload.name);
    expect(updatedData.job).toBe(updatedPayload.job);
  });

  test('Get user details (validate sample user)', async () => {
    // Reqres has only predefined users (like user 2)
    const response = await apiContext.get('/users/2');

    expect(response.status()).toBe(200);

    const userData = await response.json();
    console.log('Fetched User Data:', userData);

    expect(userData.data.id).toBe(2);
    expect(userData.data.email).toBeDefined();
  });
});
