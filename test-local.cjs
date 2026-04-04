const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure()?.errorText || ''));

  await page.goto('http://localhost:5173/#/remotion', { waitUntil: 'networkidle0' });
  
  // Also dump HTML to check if we rendered anything
  const html = await page.content();
  if (html.includes('White Screen') || html.includes('id="root"')) {
     console.log("Root element content length: ", (html.split('root')[1] || '').length);
  }
  await browser.close();
})();
