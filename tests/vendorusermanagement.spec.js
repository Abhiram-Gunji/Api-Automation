const { test, expect } = require('@playwright/test');
//Fetch Vendoruser
test('GET vendor user by userId', async ({ request }) => {
  const response = await request.get(
    'http://vendor-nlbC3-DmKlF8tZaG86-eeb79be8624f8c82.elb.ap-south-1.amazonaws.com/vendor-user/VendorUser@69c22e59-50e0-48df-af5b-ce8df3216f48'
  );

  const data = await response.json();
  console.log(data);
  expect(response.status()).toBe(200);
});
// create vendor user
test('Create vendor user', async ({ request }) => {
  const response = await request.post(
    'http://vendor-nlbC3-DmKlF8tZaG86-eeb79be8624f8c82.elb.ap-south-1.amazonaws.com/vendor-user',
    {
      data: {
        users: [
          {
            email: 'gunji+103@dataflowgroup.com',
            lastName: 'Gunji',
            firstName: 'vijay',
            userType: 'MEMBER'
          }
        ],
        vendorId: 'Vendor@3217c6ea-9f0e-4b07-87d7-bf1e676436f5'
      },
      headers: {
        'Accept': 'application/json',
        'x-authorization': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVc2VyQDkxYzRlZmQ2LTlmMmMtNDA4Ny1hNDU4LWNiNzRjOGFhNDI0NyIsImNsaWVudElkIjoiYTJiMGU1OTMtMzM1OS00YTdjLWExMmItMzVkYmY3OGI1NmEwIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxMTUwODk4OCwiZXhwIjoxNzExNTEwNzg4fQ.YRBgn2MzQEABTh3s-WQBPYNJqiyB9rOxuwmzWHu0jqoFq_2UlvFKBfqIQqnCqvtftaq4BCkNOxqynZ2HTpyFewqq4p4hobo45cTZI4g5yETp-cIGoul1Fq7joIqPrSiW6jNvuKyKOacAg0vj8x5rFGp7DdKCc9SRJCw2oa9trfcOjyVsbmY59Bn7P2Fl6M9We5742XGcqawdhMYmhACdtpgExPl51Dyq3TDN1Djph87-hxTGJdKSIIu3I-itiJ3sktinyZBTFJPeGiJuCxniigFT6Fn8hElYmPebDOsxSalc-DXuQtQNyggn6bsK_4Lq4fscKNu_7zAdesULdOVk2EUzfogh-7QPkI6zgBeVf_8VdukM-Jl3LBAuTQ7FnLZ4SOYINNielqbWE2HmZS1fDPN5YMu8fIem0CuVHcnpnGcNYPGPVHTRgnIuR3NosgxVQIYOPz3A4J4pPfWp3Xs3hIKqg6TeyAYUmXOd7xHhhFJeCUNXWdKtc4qfGmH75bQQ'
      }
    }
  );

  const data = await response.json();
  console.log(data);
  expect(response.status()).toBe(200);
})

//update vendor user

test('Update vendor user', async ({ request }) => {
  const vendorUserId = 'VendorUser@70156115-e373-480f-8486-18bdf1b31ee8';
  const url = `http://vendor-nlbC3-DmKlF8tZaG86-eeb79be8624f8c82.elb.ap-south-1.amazonaws.com/vendor-user/${vendorUserId}`;
  const response = await request.put(url, {
    data: 
    {
        status: 'PENDING'
    },
    headers: {
      'Content-Type': 'application/json',
      'x-authorization': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVc2VyQDkxYzRlZmQ2LTlmMmMtNDA4Ny1hNDU4LWNiNzRjOGFhNDI0NyIsImNsaWVudElkIjoiOThkYTU4NGMtNmVkZC00ZGQ4LWI3MmUtZWY2Yjk2MzU3N2VmIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxMDY3ODU2MywiZXhwIjoxNzEwNjgwMzYzfQ.o8cbMWBTQYClVcG40hLNy-n0LvYUXfu4fdmPG1qRrJi5Myw1qFLXPCshZ01SstOhcHnxUQamMbcP9sU2brhpHGWSYd-zTvUpXyvO2ZS_-H5q7B7xGfU-m-5_b0DlaiEh6K1KnF6J2fOqXpl8oC2KFaPnUyT5PIn1WH5SLBopUc7I_tQYJMxIUHbxYs5bprjs5Inm1M7nbJmSbgEuXw8RkBrI394Kr0m3hHY04m6AADGH1RmoSHoW-U8FmgX6UyMfWr45wIGuRCamcxa_iWp6nzPGUFZfagK0tfdXa91oCHT5cPPZqYwnSaZwmpoyno0l_1ChDvy9nB0vrUCQ5cU85G64FH_r3-fuVfsq_6AiFArXLih4X7m9-HuBe6EPQvGf18OQ_vXi2ZEYEe11mZFDtLezRb9mwY-42ekA4ZTL-ioTyq0A2XIG4_c117YFy84txxhWdpBAt_ERTTs6RTeBHVk87Z0MLRpO5OoO3C0AXwxc70UlZSAi4C_vo52NeQOv'
    }
  });

  const data = await response.json();
  console.log(data);
  expect(response.status()).toBe(200); 
});

//delete vendor User

test('Delete vendor user by ID', async ({ request }) => {
  const vendorUserId = 'VendorUser@a6ab4f9b-55ce-46c6-a212-90e22fa27045';
  const url = `http://vendor-nlbC3-DmKlF8tZaG86-eeb79be8624f8c82.elb.ap-south-1.amazonaws.com/vendor-user/${vendorUserId}`;

  const response = await request.delete(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-authorization': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVc2VyQDkxYzRlZmQ2LTlmMmMtNDA4Ny1hNDU4LWNiNzRjOGFhNDI0NyIsImNsaWVudElkIjoiOThkYTU4NGMtNmVkZC00ZGQ4LWI3MmUtZWY2Yjk2MzU3N2VmIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxMDY3ODU2MywiZXhwIjoxNzEwNjgwMzYzfQ.o8cbMWBTQYClVcG40hLNy-n0LvYUXfu4fdmPG1qRrJi5Myw1qFLXPCshZ01SstOhcHnxUQamMbcP9sU2brhpHGWSYd-zTvUpXyvO2ZS_-H5q7B7xGfU-m-5_b0DlaiEh6K1KnF6J2fOqXpl8oC2KFaPnUyT5PIn1WH5SLBopUc7I_tQYJMxIUHbxYs5bprjs5Inm1M7nbJmSbgEuXw8RkBrI394Kr0m3hHY04m6AADGH1RmoSHoW-U8FmgX6UyMfWr45wIGuRCamcxa_iWp6nzPGUFZfagK0tfdXa91oCHT5cPPZqYwnSaZwmpoyno0l_1ChDvy9nB0vrUCQ5cU85G64FH_r3-fuVfsq_6AiFArXLih4X7m9-HuBe6EPQvGf18OQ_vXi2ZEYEe11mZFDtLezRb9mwY-42ekA4ZTL-ioTyq0A2XIG4_c117YFy84txxhWdpBAt_ERTTs6RTeBHVk87Z0MLRpO5OoO3C0AXwxc70UlZSAi4C_vo52NeQOv'
    }
  });

  const data = await response.json();
  console.log(data);
  expect(response.status()).toBe(200); 
});

