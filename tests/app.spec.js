import { test, expect } from "@playwright/test";
test("Logi", async({page})=>
{
    await page.goto("https://operations.preprod.dataflowgroup.com/en/onboarding/sso-login");
})