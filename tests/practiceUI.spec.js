import{test, expect} from '@playwright/test'
test("login", async({page})=>
{
//     await page.goto("https://www.facebook.com/");
//     await page.locator('[name="email"]').fill("gunjiabhiram@gmail.com");
//     await page.locator('//input[@id="pass"]').fill("Abhiram");
//     //await page.locator('//button[@data-testid ="royal-login-button"]').click();
//    await page.locator('text=Forgotten password?').click();
//    //await expect(page).toHaveURL('**/login/identify/?ctx=recover&ars=facebook_login&from_login_screen=0');
//    await page.locator('//input[@placeholder="Email address or mobile number"]').fill("2456543");
//    //await page.locator('[text=Search]').click();
//    await page.screenshot('Downloads/face.png');
await page.goto("https://app.preprod.dataflowgroup.com/en/onboarding/signin");
await expect(page).toHaveTitle("Application Portal");
await expect(page).toHaveURL(/signin/);
await page.locator('[name="email"]').fill("gunjiabhiram+12341@dataflowgroup.com");
await page.locator('#applicantOnboardingCaptcha').fill("123456");
await page.locator('//input[@data-testid="signInCheckbox"]').click();
await page.getByRole('button', { name: 'Get OTP' }).click();
await expect(page).toHaveURL(/onboarding\/verification\/mobile/);
await page.getByTestId('input0').fill(1);
await page.getByTestId('input1').fill(2);
await page.getByTestId('input2').fill("3");
await page.getByTestId('input3').fill("4");
await page.getByTestId('input4').fill("5");
await page.getByTestId('input5').fill("6");
await expect(page).toHaveURL('/dashboard\/home');




});