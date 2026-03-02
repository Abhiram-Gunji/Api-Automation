import { expect, test, request } from "@playwright/test";

test('get By Id', async({request})=>
{
 const response = await request.get('http://nginx--nlbC3-hjNa0pnRoiJ7-257492ea392d9b9b.elb.ap-south-1.amazonaws.com/verification-workflow-engine/workflow/DFG-IA-CB995B-176',
    {
      headers: {
        'Content-Type': 'application/json'
      },
    });
     const responseBody = await response.json();  
  console.log("Response Body:", responseBody);

  expect(response.status()).toBe(200); 
}
)