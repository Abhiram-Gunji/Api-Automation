import { expect, request, test } from "@playwright/test";
// Create Addon@express price for multiple client contracts

test('Create Addon@express for multiple client contracts', async ({ request }) => {

  const clientContractIds = [
'ClientContract@4b82d6db-d356-4b3e-8c4c-62f61bd8e48e',
'ClientContract@49cc6d61-a261-402e-995b-c9a5d3229b6d',
'ClientContract@ce618a5e-b8c2-42f0-a4f7-0988341feed7',
'ClientContract@0fec1f21-0546-4d2d-9ef6-82ac6779d187',
'ClientContract@ad10bb32-65d6-41ac-acef-ecea2bc32c85',
'ClientContract@85b7fa3b-2e8a-4188-8c13-5d812bb5b5b1',
'ClientContract@7bd2f4bd-e904-4565-862a-b87deb89e30e',
'ClientContract@fac8d1d6-de93-4a66-bd6c-dfec45d0097c',
'ClientContract@fef87339-9c09-48ac-ae50-a73bd7d1d1e8',
'ClientContract@cc56faf6-bfc9-46f5-bce5-7c09d6693d6c',
'ClientContract@dfaadad8-9e6a-45f1-92c6-6eb1acc083c8',
'ClientContract@2a948e30-92c3-4509-a5f9-70ca8d8b2384'
];

  const url = `http://nginx--nlbC3-sn7vKMsxDDMK-3360319dfff3cca3.elb.eu-west-1.amazonaws.com/verification-request/addon-config`;

  for (const clientContractId of clientContractIds) {

    console.log(`\nCreating Addon for: ${clientContractId}`);

    const payload = {
      addonId: "Addon@express",
      basePrice: {
        amount: 1000,
        currency: {
          name: "SAR",
          symbol: "SAR",
          code: "SAR"
        }
      },
      additionalPricePerUnit: {
        amount: 0,
        currency: {
          name: "SAR",
          symbol: "SAR",
          code: "SAR"
        }
      },
      discountPrice: {
        amount: 0,
        currency: {
          name: "SAR",
          symbol: "SAR",
          code: "SAR"
        }
      },
      tags: [],
      clientContractId
    };

    const response = await request.post(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: payload
    });

    // Usually creation APIs return 200 or 201
    expect([200, 201]).toContain(response.status());

    const responseData = await response.json();
    console.log(`✅ Addon created for ${clientContractId}`);
    console.log(JSON.stringify(responseData, null, 2));
  }

});