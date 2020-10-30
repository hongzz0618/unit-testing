const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util');

test('should output name and age', () => {
  let email = "zhougg98@gmail.com"
  const text = generateText(email);
  expect(text).toBe('email true');
});

test('should generate a valid text output', () => {
  const text = checkAndGenerate('zhougg98@gmail.com');
  expect(text).toBe('zhougg98@gmail.com');
});

test('should create an element with text and correct class', async () => {
  jest.setTimeout(20000);
  const browser = await puppeteer.launch({
    headless: true,
    // slowMo: 40,
    // args: ['--window-size=1920,1080']
  });
  const page = await browser.newPage();
  await page.goto(
    'yourroute/onboarding.html'
  );
  await page.type('input#email', 'emounittest@yopmail.com');
  await page.type('input#country', 'ES');
  await page.type('input#name', 'Maria');
  await page.type('input#surname', 'Rodriguez Brown');
  await page.type('input#password', 'mipassword');
  await page.click('#btnAddUser');
  const finalText = await page.$eval('.user-item', el => el.textContent);
  expect(finalText).toBe(`email: emounittest@yopmail.com true`);
});