import { test, expect } from '@playwright/test';

test('Update reportTransferConfig for multiple client contracts', async ({ request }) => {
  // List of client contracts
  const clientContracts = [
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

  // Same allowed client IDs for all contracts
  const allowedClientIds = [
'Clients@cc099e82-2681-43c7-8f05-84f77cecb8a1',
'Clients@a86358d1-0c2b-4a8f-bba2-3e91a05a1451',
'Clients@ed3e8561-9cd9-494e-8896-1ac4e347cf6d',
'Clients@ed830324-51bd-44e9-a676-ea5e1333075c',
'Clients@a52eedae-22bb-42f9-90c6-66fbbd67196a',
'Clients@5cf4c743-a664-40f1-a166-a2e6bec83ab7',
'Clients@f1bdc68b-1dc6-4919-9fce-7a6af4b1ca5e',
'Clients@19408ca3-8aef-47d6-9847-77ff05a04095',
'Clients@34fdf363-220f-440e-8d11-8515b8a6f11f',
'Clients@2799ba7a-50ef-4122-94a2-d19835677fc5',
'Clients@fad347ac-f9cb-41b7-bcd4-2babb7190dbd',
'Clients@ebc68af2-f81a-4a81-ba27-f9416389337d',
'Clients@bf65bf94-7e78-405a-a2ac-cd843eefdff9',
'Clients@29511518-b629-4306-b548-ea80461b1e40',
'Clients@2ae10f3f-a62a-4bb5-9c98-588cda565ae5',
'Clients@9cff946a-a968-4e73-810e-f4f9bf3f58c9',
'Clients@96266110-2071-4a4e-ae3a-4837a978c968',
'Clients@28aed578-e6e5-4d58-b713-0d29357121b0',
'Clients@00eaeeba-f1cb-4b48-8427-917e9981b2cc',
'Clients@051cb269-5b2f-4131-ac55-59df7429f028',
'Clients@aff42be6-7353-4aee-8320-cf129e40b1c1',
'Clients@6590077f-1569-498d-aec2-fac38b6623cb',
'Clients@81d0cf34-2388-4953-a396-cc49425a4587',
'Clients@96e1115f-aaf3-4721-a4cf-e7d263fce718',
'Clients@ab14ea95-9cd3-4c85-9f66-b7e83780f9f8',
'Clients@ba11198d-8584-408a-ab9f-fa798fb4ac81',
'Clients@42d14b2d-52d3-47dd-b9b1-67553fa26785',
'Clients@f61f8ac4-ee82-4317-b639-b5230941afa0',
'Clients@0b04d6be-af7c-438a-b38f-d58aa06c745b',
'Clients@a8ce2d30-7bed-4c92-8aeb-1a28aee35a17',
'Clients@62c3ab82-72d6-4a2e-a14e-7c8821de4b9f',
'Clients@043bab6e-a620-4853-80e4-f3b579392fe0',
'Clients@af65caff-bcdc-4b84-95ef-bc4aad8ccd54',
'Clients@4e00e3b1-9e7a-4f92-91fa-62332c64590d',
'Clients@d9aa8cb6-7ee2-4d47-87a3-342be7f467d9',
'Clients@0f7295e2-d27f-4f7f-bc98-b3387583696e',
'Clients@3e2c23e1-a620-493a-addd-90ba82468784',
'Clients@78bb4a67-0b57-4dea-9491-5fc3842b0330',
'Clients@0cf50679-6a17-43f3-8252-db7e52dad6c5',
'Clients@f2b1f3a7-f596-47cb-91c8-5365a3004fda',
'Clients@6a12d565-f099-4ef8-9854-a66e44c3b2db',
'Clients@e186edee-92df-4535-9dfc-85b046ea0d73',
'Clients@acbac55f-9806-4aaf-a060-04ada60f3086',
'Clients@c3076d70-7fe4-4fa4-b37c-9a41d4390252',
'Clients@eca732d0-268e-42d4-9ad5-515e95688609',
'Clients@0b5ebafc-bcca-4876-af4a-d97e5990c902'
  ];

  for (const contractId of clientContracts) {
    console.log(`🔹 Updating reportTransferConfig for: ${contractId}`);

    const payload = {
      reportTransferConfig: {
        allowedOldSystemSources: ['VERIFLOW'],
        allowedReportTransferComponentStatus: [
          'VERIFIED_APPROVED',
          'VERIFIED_REJECTED',
          'UNABLE_TO_VERIFY'
        ],
        allowedReportTransferStatus: [
          'VERIFIED_APPROVED',
          'VERIFIED_REJECTED',
          'UNABLE_TO_VERIFY'
        ],
        allowReportTransferOnly: false,
        clientLevelTransferFees: {},
        earliestYearAllowed: 2018,
        incomingTransferPermissions: {
          allowAllClients: false,
          allowedClientIds,
          transferAllowed: true
        },
        interClientTransferFees: { amount: 500, currency: { id: 'SAR', code: 'SAR', name: 'SAR', symbol: 'SAR' } },
        intraClientTransferFees: { amount: 500, currency: { id: 'SAR', code: 'SAR', name: 'SAR', symbol: 'SAR' } },
        isReportLevelSelection: true,
        isReportTransferAllowed: true,
        isStraightThroughTransfer: false,
        outgoingTransferPermissions: { allowAllClients: true, allowedClientIds: [], transferAllowed: true },
        reportTransferFees: { amount: 500, currency: { id: 'SAR', code: 'SAR', name: 'SAR', symbol: 'SAR' } }
      }
    };

    const response = await request.patch(
      `http://nginx--nlbC3-sn7vKMsxDDMK-3360319dfff3cca3.elb.eu-west-1.amazonaws.com/client-contract-service/client-contract/${contractId}`,
      { data: payload }
    );

    if (response.ok()) {
      console.log(`   ✅ Updated successfully`);
    } else {
      const errorBody = await response.json().catch(() => ({}));
      console.log(`   ❌ Failed with status ${response.status()}`);
      console.log(`   Response: ${JSON.stringify(errorBody)}`);
    }
  }
});