import { test, expect, request as baseRequest } from '@playwright/test';

// Append licensingExamination component to multiple contracts

test('Append ComponentType@licensingExamination to multiple client contracts', async ({ request }) => {

  const clientContractIds = [
    'ClientContract@1fd46fd7-8205-4679-a278-5e83c2153152',
    'ClientContract@2e613905-74dc-4676-825f-5f04623c61fa',
    'ClientContract@c4a10566-7ec3-4c3f-b882-49561b2d9ed5',
    'ClientContract@ffdb9f4f-2812-467f-a60b-bdcc870c4ff0',
    'ClientContract@43ab04c9-495f-41f1-9b72-c4d01bbf8a4a',
    'ClientContract@e8ee4dbe-5123-4772-9131-f5957e92c369',
    'ClientContract@1c0211c1-1842-41ef-93d3-89ce6785cfb6',
    'ClientContract@638f19d7-e4da-4257-932b-8d8edfef5e2a'
  ];

  const newComponent = 'ComponentType@licensingExamination';

  for (const clientContractId of clientContractIds) {

    console.log(`\nProcessing Contract: ${clientContractId}`);

    // Step 1: Fetch existing contract
    const getUrl = `http://nginx--nlbc3-fo19n4q4lzrb-761f631e132758db.elb.ap-south-1.amazonaws.com/client-contract-service/client-contract?id=${clientContractId}`;

    const getResponse = await request.get(getUrl);
    expect(getResponse.status()).toBe(200);

    const getData = await getResponse.json();
    const contract = getData.entities[0];

    let allowedComponentTypeIds = contract.allowedComponentTypeIds || [];
    let allowedToUpsellComponentTypeIds = contract.allowedToUpsellComponentTypeIds || [];

    // Step 2: Append only if not already present
    if (!allowedComponentTypeIds.includes(newComponent)) {
      allowedComponentTypeIds.push(newComponent);
    }

    if (!allowedToUpsellComponentTypeIds.includes(newComponent)) {
      allowedToUpsellComponentTypeIds.push(newComponent);
    }

    // Step 3: PATCH update
    const patchUrl = `http://nginx--nlbc3-fo19n4q4lzrb-761f631e132758db.elb.ap-south-1.amazonaws.com/client-contract-service/client-contract/${clientContractId}`;

    const patchResponse = await request.patch(patchUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        allowedComponentTypeIds,
        allowedToUpsellComponentTypeIds
      }
    });

    expect(patchResponse.status()).toBe(200);

    console.log(`✅ Successfully updated: ${clientContractId}`);
  }

});