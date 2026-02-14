const { test, expect } = require('@playwright/test');

// JSONPlaceholder API Automation Tests

test.describe('JSONPlaceholder API Tests', () => {
  let request;
  let userId;

  // Before all tests, create a request context
  test.beforeAll(async ({ playwright }) => {
    request = await playwright.request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com',
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  });

  test.afterAll(async () => {
    await request.dispose();
  });

  test('Full User Lifecycle: Create → Retrieve → Modify', async () => {
    console.log('Starting full API workflow...\n');

    // STEP 1: CREATE A USER
    console.log('Creating a new user');
    const newUser = {
      name: "Abhiram Gunji",
      job: "Automation QA Engineer"
    };

    const createResponse = await request.post('/users', { data: newUser });
    console.log(`Create user status: ${createResponse.status()}`);
    expect(createResponse.status()).toBe(201);

    const createResponseBody = await createResponse.json();
    console.log('Create response body:', JSON.stringify(createResponseBody, null, 2));

    userId = createResponseBody.id.toString();
    console.log(`Stored userId: ${userId}\n`);

    expect(createResponseBody.id).toBeDefined();
    expect(createResponseBody.name).toBe(newUser.name);
    expect(createResponseBody.job).toBe(newUser.job);

    // STEP 2: GET USER DETAILS
    console.log('Fetching user details');
    const getUserResponse = await request.get('/users/3'); // JSONPlaceholder has predefined users 1-10
    console.log(`Get user status: ${getUserResponse.status()}`);
    expect(getUserResponse.status()).toBe(200);

    const getUserResponseBody = await getUserResponse.json();
    console.log('Get user response:', JSON.stringify(getUserResponseBody, null, 2));

    expect(getUserResponseBody.id).toBeDefined();
    expect(getUserResponseBody.name).toBeDefined();
    expect(getUserResponseBody.email).toBeDefined();
    expect(getUserResponseBody.username).toBeDefined();
    console.log(`User details - Name: ${getUserResponseBody.name} (${getUserResponseBody.username})\n`);

    // STEP 3: UPDATE USER
    console.log('Updating user information');
    const updatedUser = {
      name: "Gunji Vijaya Babu",
      job: "Software Engineer"
    };

    const updateResponse = await request.put('/users/3', { data: updatedUser });
    console.log(`Update user status: ${updateResponse.status()}`);
    expect(updateResponse.status()).toBe(200);

    const updateResponseBody = await updateResponse.json();
    console.log('Update response:', JSON.stringify(updateResponseBody, null, 2));

    expect(updateResponseBody.name).toBe(updatedUser.name);
    expect(updateResponseBody.job).toBe(updatedUser.job);

    console.log('Full API workflow completed successfully!');
  });

  test('Debug API Endpoints', async () => {
    console.log('Debugging API endpoints');

    const testResponse = await request.get('/users/1');
    console.log(`GET /users/1 status: ${testResponse.status()}`);

    if (testResponse.ok()) {
      const body = await testResponse.json();
      console.log('GET response:', JSON.stringify(body, null, 2));
    }

    const postResponse = await request.post('/users', { data: { name: "Tester One", job: "QA" } });
    console.log(`POST /users status: ${postResponse.status()}`);
    const responseText = await postResponse.text();
    console.log('POST response body:', responseText);

    expect(testResponse.status()).toBeGreaterThanOrEqual(200);
  });

  test('Handle Non-existent User Error', async () => {
    console.log('Testing error handling for missing user');
    const response = await request.get('/users/999');
    console.log(`Status: ${response.status()}`);
    expect(response.status()).toBe(404);

    const responseBody = await response.json();
    console.log('Error response:', JSON.stringify(responseBody, null, 2));
  });

  test('Partial Update via PATCH', async () => {
    console.log('Testing PATCH method');
    const partialUpdate = { job: "Assistant Coach" };
    const patchResponse = await request.patch('/users/3', { data: partialUpdate });
    expect(patchResponse.status()).toBe(200);

    const patchResponseBody = await patchResponse.json();
    console.log('PATCH response:', JSON.stringify(patchResponseBody, null, 2));

    expect(patchResponseBody.job).toBe(partialUpdate.job);
    expect(patchResponseBody.id).toBe(3);
    expect(patchResponseBody.name).toBeDefined();
  });

  test('Delete User', async () => {
    console.log('Testing DELETE method');
    const deleteResponse = await request.delete('/users/3');
    console.log(`Delete status: ${deleteResponse.status()}`);
    expect(deleteResponse.status()).toBe(200);

    const deleteResponseBody = await deleteResponse.json();
    console.log('Delete response body:', JSON.stringify(deleteResponseBody, null, 2));
  });

  test('GET Users with Query Parameters', async () => {
    console.log('Testing GET with query parameters');
    const response = await request.get('/users?_limit=5');
    console.log(`GET with limit status: ${response.status()}`);
    expect(response.status()).toBe(200);

    const users = await response.json();
    console.log(`Found ${users.length} users with limit`);
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeLessThanOrEqual(5);
  });

  test('API Response Time Check', async () => {
    console.log('Testing API response time...');
    const startTime = Date.now();
    const response = await request.get('/users');
    const endTime = Date.now();

    const responseTime = endTime - startTime;
    console.log(`Response time: ${responseTime}ms`);

    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThan(5000);
  });
});


// Helper Class

class ApiHelper {
  constructor(request, baseUrl) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async createUser(userData) {
    try {
      const response = await this.request.post('/users', { data: userData });
      if (!response.ok()) throw new Error(`Failed to create user: ${response.status()} ${response.statusText()}`);
      return await response.json();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getUserWithRetry(userId, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await this.request.get(`/users/${userId}`);
        if (response.ok()) return await response.json();
        if (i === maxRetries - 1) throw new Error(`Failed after ${maxRetries} attempts`);
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      } catch (error) {
        if (i === maxRetries - 1) throw error;
      }
    }
    throw new Error('Unexpected error in retry logic');
  }

  validateUserResponse(response) {
    const requiredFields = ['id', 'name', 'username', 'email'];
    return requiredFields.every(field => response.hasOwnProperty(field) && response[field] !== null);
  }

  async getAllUsers() {
    const response = await this.request.get('/users');
    if (!response.ok()) throw new Error(`Failed to get users: ${response.status()} ${response.statusText()}`);
    return await response.json();
  }

  async searchUsersByName(name) {
    const allUsers = await this.getAllUsers();
    return allUsers.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
  }
}

// Example Using Helper
test('Helper Class Workflow - JavaScript Version', async ({ playwright }) => {
  const request = await playwright.request.newContext({ baseURL: 'https://jsonplaceholder.typicode.com' });
  const apiHelper = new ApiHelper(request, 'https://jsonplaceholder.typicode.com');

  try {
    const newUser = { name: "Emily Clark", job: "UX Designer" };
    const createdUser = await apiHelper.createUser(newUser);
    console.log('Created user via helper:', createdUser);

    const fetchedUser = await apiHelper.getUserWithRetry(1);
    console.log('Fetched user via helper:', fetchedUser.name);

    const isValid = apiHelper.validateUserResponse(fetchedUser);
    expect(isValid).toBe(true);
    console.log('User response validation passed');

    const searchResults = await apiHelper.searchUsersByName('Clementine');
    console.log(`Found ${searchResults.length} users matching 'Clementine'`);
    expect(searchResults.length).toBeGreaterThan(0);

    const allUsers = await apiHelper.getAllUsers();
    console.log(`Retrieved ${allUsers.length} total users`);
    expect(allUsers.length).toBe(10);

  } finally {
    await request.dispose();
  }
});

// Data-Driven Tests

test.describe('Data-Driven User Creation', () => {
  const testUsers = [
    { name: "David Miller", job: "Architect" },
    { name: "Sophia Turner", job: "Engineer" },
    { name: "Liam Brown", job: "Analyst" }
  ];

  testUsers.forEach((userData, index) => {
    test(`Create test user ${index + 1}: ${userData.name}`, async ({ playwright }) => {
      const request = await playwright.request.newContext({ baseURL: 'https://jsonplaceholder.typicode.com' });

      const response = await request.post('/users', { data: userData });
      expect(response.status()).toBe(201);

      const createdUser = await response.json();
      expect(createdUser.name).toBe(userData.name);
      expect(createdUser.job).toBe(userData.job);

      console.log(`Successfully created user: ${userData.name}`);

      await request.dispose();
    });
  });
});
