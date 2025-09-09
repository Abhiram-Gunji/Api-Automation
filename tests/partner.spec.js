import { test, expect } from '@playwright/test';

test('Get case details', async ({ request }) => {
  // Send a GET request to the API endpoint
  const response = await request.get('http://verifi-nlbc3-wofxihpeb4as-69ae9e09eb6b410a.elb.ap-south-1.amazonaws.com/workflow/B003-250908-A646F');

  // Verify that the response status is 200 OK
  expect(response.status()).toBe(200);

  // Parse the response body as JSON
  const caseDetails = await response.json();

console.log(JSON.stringify(caseDetails, null, 2));

});