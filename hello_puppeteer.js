const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 1000,
  })
  const page = await browser.newPage();
  await page.goto('https://pptr.dev/');

  const selector = 'div[id="__docusaurus"]';
  await page.waitForSelector(selector, {timeout: 30000});

  await browser.close();
  
})();