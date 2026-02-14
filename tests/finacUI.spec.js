import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

//   CLASS IMPLEMENTATION
class BookStoreFlow {
  constructor(page) {
    this.page = page;
  }
  // Navigate to DemoQA homepage
  async launchHomePage() {
    await this.page.goto('https://demoqa.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 20000
    });

    // Wait for card availability
    await this.page.locator('text=Book Store Application').waitFor();
    console.log("Home page loaded successfully");
  }

  // Navigate to Book Store Application page
  async openBookStoreModule() {
    const moduleCard = this.page.locator('text=Book Store Application');
    await moduleCard.waitFor();
    await moduleCard.click();

    await this.page.waitForURL('**/books', { timeout: 15000 });

    console.log("Redirected to Book Store module");
  }

  // Login into DemoQA Book Store
  async authenticateUser(username, password) {
    await this.page.click('text=Login');
    await this.page.waitForURL('**/login');

    await this.page.fill('#userName', username);
    await this.page.fill('#password', password);
    await this.page.click('#login');

    await this.page.waitForURL('**/profile', { timeout: 15000 });

    console.log(`Login successful for user: ${username}`);
  }

  // Validate login success

  async verifyUserLogin(expectedUsername) {
    await this.page.waitForTimeout(2000);

    const usernameLabel = this.page.locator(`text=${expectedUsername.toLowerCase()}`).first();
    await expect(usernameLabel).toBeVisible();

    const logoutOption = this.page.locator('text=Log out');
    await expect(logoutOption).toBeVisible();

    console.log("User verification completed");
  }


  // Navigate to Book Store page

  async goToBookStorePage() {
    const activeUrl = this.page.url();

    if (activeUrl.includes('/books')) {
      console.log("Already on Book Store page");
      return;
    }

    const redirectBtn = this.page.locator('text=Go To Book Store');
    if (await redirectBtn.isVisible()) {
      await redirectBtn.click();
    } else {
      await this.page.click('text=Book Store');
    }

    await this.page.waitForURL('**/books', { timeout: 10000 });
    await this.page.waitForSelector('#searchBox');

    console.log("➡ Successfully navigated to Book Store page");
  }

  // -------------------------------
  // Search for a specific book
  // -------------------------------
  async lookupBook(bookTitle) {
    const searchInput = this.page.locator('#searchBox');
    await searchInput.waitFor({ timeout: 5000 });

    await searchInput.fill('');
    await searchInput.fill(bookTitle);

    await this.page.waitForTimeout(3000);

    console.log(`Searching for: ${bookTitle}`);
  }

  // Validate search results and extract book details
  async fetchBookDetails(expectedBookTitle) {
    await this.page.waitForSelector('.rt-tbody .rt-tr-group', { timeout: 8000 });

    const row = this.page.locator('.rt-tr-group').first();
    await row.waitFor();

    const title = (await row.locator('.rt-td').nth(1).locator('a').textContent()).trim();
    const author = (await row.locator('.rt-td').nth(2).textContent()).trim();
    const publisher = (await row.locator('.rt-td').nth(3).textContent()).trim();

    expect(title.toLowerCase()).toContain(expectedBookTitle.toLowerCase());

    console.log("Book information retrieved:");
    console.log(`Title: ${title}`);
    console.log(`Author: ${author}`);
    console.log(`Publisher: ${publisher}`);

    return { title, author, publisher };
  }

  // Save book details into a text file
  async storeBookInfo(bookData, filename = 'book_details.txt') {
    const content = `
Book Details:
Title: ${bookData.title}
Author: ${bookData.author}
Publisher: ${bookData.publisher}
Date: ${new Date().toISOString()}
`;

    const filePath = path.join(process.cwd(), 'test-results', filename);

    if (!fs.existsSync('test-results')) {
      fs.mkdirSync('test-results');
    }

    fs.writeFileSync(filePath, content);

    console.log(`Book data saved to file: ${filePath}`);
  }

  // Logout
  async signOutUser() {
    await this.page.getByRole('button', { name: 'Log out' }).click();
    await this.page.waitForURL('**/login');

    console.log(" User logged out");
  }
}


//  TEST Case 1 for login and searching
test.describe('DemoQA Book Store Application', () => {

  test('Complete Book Store Test Flow', async ({ page }) => {
    const workflow = new BookStoreFlow(page);

    const username = 'Abhiram_462';
    const password = 'Abhiram@462';
    const searchBookTitle = 'Learning JavaScript Design Patterns';

    await workflow.launchHomePage();
    await workflow.openBookStoreModule();
    await workflow.authenticateUser(username, password);
    await workflow.verifyUserLogin(username);
    await workflow.goToBookStorePage();
    await workflow.lookupBook(searchBookTitle);

    const bookData = await workflow.fetchBookDetails(searchBookTitle);
    await workflow.storeBookInfo(bookData);

    await workflow.signOutUser();

    console.log(" Full Book Store automation completed successfully!");
  });
  //Testcase 2 without login and searching

  test('Search Book Without Login', async ({ page }) => {
    const workflow = new BookStoreFlow(page);

    await workflow.launchHomePage();
    await workflow.openBookStoreModule();
    await workflow.lookupBook('Learning JavaScript Design Patterns');

    const bookData = await workflow.fetchBookDetails('Learning JavaScript Design Patterns');

    await workflow.storeBookInfo(bookData, 'search_only_results.txt');
  });
});
